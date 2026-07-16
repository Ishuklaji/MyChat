import { Avatar, Tooltip, Box, Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton, HStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
// import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢"];

const ReactionSummary = ({ reactions, currentUserId, onReact }) => {
    if (!reactions || reactions.length === 0) return null;

    const grouped = reactions.reduce((acc, r) => {
        acc[r.emoji] = acc[r.emoji] || [];
        acc[r.emoji].push(r);
        return acc;
    }, {});

    return (
        <HStack spacing={1} mt={1} flexWrap="wrap">
            {Object.entries(grouped).map(([emoji, reactors]) => {
                const mine = reactors.some((r) => r.user?._id === currentUserId);
                return (
                    <Box
                        key={emoji}
                        as="button"
                        onClick={() => onReact(emoji)}
                        fontSize="xs"
                        px={2}
                        py="1px"
                        borderRadius="full"
                        bg={mine ? "teal.100" : "blackAlpha.100"}
                        border={mine ? "1px solid" : "none"}
                        borderColor="teal.400"
                    >
                        {emoji} {reactors.length}
                    </Box>
                );
            })}
        </HStack>
    );
};

const ScrollableChat = ({ messages, reactToMessage }) => {
    const { user } = ChatState();
    const ownBubbleBg = useColorModeValue("#BEE3F8", "blue.600");
    const otherBubbleBg = useColorModeValue("#B9F5D0", "green.600");

    useEffect(() => {
        let scrl = document.getElementById("scrl");
        scrl.scrollTo(0, 2147483647)
    }, [messages])

    return (
        <Box id="scrl" height={{ base: "600px", sm: "600px", md: "450px", lg: "450px" }}
            overflowX="hidden"
            overflowY="scroll"
            scrollBehavior="smooth"
        >
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <Box
                            style={{
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                maxWidth: "75%",
                            }}
                        >
                            <Popover trigger="hover" placement="top" isLazy>
                                <PopoverTrigger>
                                    <Box
                                        bg={m.sender._id === user._id ? ownBubbleBg : otherBubbleBg}
                                        borderRadius="20px"
                                        px="15px"
                                        py="5px"
                                        cursor="default"
                                    >
                                        {m.content}
                                    </Box>
                                </PopoverTrigger>
                                <PopoverContent w="auto">
                                    <PopoverBody>
                                        <HStack spacing={1}>
                                            {REACTION_EMOJIS.map((emoji) => (
                                                <IconButton
                                                    key={emoji}
                                                    aria-label={`react ${emoji}`}
                                                    size="xs"
                                                    variant="ghost"
                                                    fontSize="md"
                                                    onClick={() => reactToMessage && reactToMessage(m._id, emoji)}
                                                >
                                                    {emoji}
                                                </IconButton>
                                            ))}
                                        </HStack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                            <ReactionSummary
                                reactions={m.reactions}
                                currentUserId={user._id}
                                onReact={(emoji) => reactToMessage && reactToMessage(m._id, emoji)}
                            />
                        </Box>
                    </div>
                ))}
        </Box>
    );
};

export default ScrollableChat;
