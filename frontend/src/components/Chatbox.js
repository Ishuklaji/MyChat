import { Box, useColorModeValue } from "@chakra-ui/react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    const bg = useColorModeValue("white", "gray.800");

    return (
        <Box
            className="chbx"
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            px={3}
            justifyContent="space-between"
            bg={bg}
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            boxShadow="md"

        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default Chatbox;