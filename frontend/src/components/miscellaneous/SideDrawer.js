import {
    Button, Menu, MenuList,
    MenuButton, Text, Tooltip, MenuDivider,
    Flex, Avatar, MenuItem, Drawer,
    DrawerBody, Input,
    DrawerContent, useToast,
    DrawerHeader, Spinner,
    DrawerOverlay, useDisclosure, Badge,
    useColorMode, useColorModeValue, IconButton
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import { useNavigate } from "react-router";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import { BASE_URL } from "../../config/api";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();

    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const barBg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const history = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };


    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${BASE_URL}/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };


    return (
        <>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                bg={barBg}
                w="100%"
                p="5px 10px 5px 10px"
                borderBottomWidth="1px"
                boxShadow="sm"
            >
                <Tooltip
                    label="Search Users to chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text display={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text
                    fontSize="2xl"
                    fontFamily="Work sans"
                    fontWeight="700"
                    bgGradient="linear(to-r, teal.400, purple.500)"
                    bgClip="text"
                >
                    La Charla
                </Text>
                <Flex alignItems="center">
                    <IconButton
                        aria-label="Toggle color mode"
                        onClick={toggleColorMode}
                        variant="ghost"
                        mr={2}
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    />
                    <Menu>
                        <MenuButton p={1}>
                            {/* <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            /> */}
                            <Badge ml='1' colorScheme='green'>
                                {notification.length}
                            </Badge>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>{" "}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Flex pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Flex>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer