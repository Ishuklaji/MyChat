import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Homepage() {
    const history = useNavigate();
    const cardBg = useColorModeValue("white", "gray.800");
    const pageBg = useColorModeValue(
        "linear(to-br, teal.50, purple.50)",
        "linear(to-br, gray.900, gray.800)"
    );

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user)
            history("/chats");
    }, [history]);

    return (
        <Box minH="100vh" bgGradient={pageBg}>
            <Container maxW="xl" centerContent pt="10">
                <Box
                    display="flex"
                    justifyContent="center"
                    p={4}
                    bg={cardBg}
                    w="100%"
                    m="40px 0 15px 0"
                    borderRadius="2xl"
                    boxShadow="lg"
                >
                    <Text
                        fontSize="4xl"
                        fontWeight="800"
                        textAlign="center"
                        fontFamily="Work sans"
                        bgGradient="linear(to-r, teal.400, purple.500)"
                        bgClip="text"
                    >
                        La Charla
                    </Text>
                </Box>
                <Box bg={cardBg} w="100%" p={4} borderRadius="2xl" boxShadow="lg">
                    <Tabs isFitted variant="soft-rounded" colorScheme="teal">
                        <TabList mb="1em">
                            <Tab>Login</Tab>
                            <Tab>SignUp</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Box>
    );
}

export default Homepage;
