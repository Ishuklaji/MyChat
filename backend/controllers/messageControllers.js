const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel.js");
const User = require("../models/userModel.js");
const Chat = require("../models/chatModel.js");

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat")
            .populate("reactions.user", "name");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const toggleReaction = asyncHandler(async (req, res) => {
    const { emoji } = req.body;
    const { messageId } = req.params;

    if (!emoji) {
        res.status(400);
        throw new Error("Emoji is required");
    }

    const message = await Message.findById(messageId);

    if (!message) {
        res.status(404);
        throw new Error("Message not found");
    }

    const existingIndex = message.reactions.findIndex(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingIndex > -1) {
        if (message.reactions[existingIndex].emoji === emoji) {
            message.reactions.splice(existingIndex, 1);
        } else {
            message.reactions[existingIndex].emoji = emoji;
        }
    } else {
        message.reactions.push({ user: req.user._id, emoji });
    }

    await message.save();

    const updatedMessage = await Message.findById(messageId)
        .populate("sender", "name pic")
        .populate("chat")
        .populate("reactions.user", "name");

    res.json(updatedMessage);
});

module.exports = { sendMessage, allMessages, toggleReaction }