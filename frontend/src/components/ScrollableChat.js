import { Avatar, Tooltip, Box } from "@chakra-ui/react";
import { useEffect } from "react";
// import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    useEffect(() => {
        let scrl = document.getElementById("scrl");
        scrl.scrollTo(0, 2147483647)
        // console.log(scrl)
        // console.log(window.scrl.innerHeight)
    }, [messages])

    return (
        <Box id="scrl" height={{ base: "600px", sm: "600px", md: "450px", lg: "450px" }}
            overflowX="hidden"
            overflowY="scroll"
            scrollBehavior="smooth"
        >
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
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
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
        </Box>
    );
};

export default ScrollableChat;