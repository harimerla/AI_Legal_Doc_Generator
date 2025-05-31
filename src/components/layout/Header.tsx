"use client";

import {
  Box,
  Flex,
  Button,
  Heading,
  Spacer,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Tooltip,
  useColorMode,
  IconButton,
  useColorModeValue,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { logOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiFileText, FiClock, FiSettings } from "react-icons/fi";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue("#e3e8ee", "#23263A");
  const iconColor = useColorModeValue("brand.text.dark", "white");
  const headingColor = useColorModeValue("brand.primary", "white");
  const navTextColor = useColorModeValue("brand.text.dark", "white");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItemHoverBg = useColorModeValue("gray.50", "gray.700");

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Get user's first name from email
  const firstName = user?.email?.split("@")[0] || "User";

  return (
    <Box
      as="header"
      py={{ base: 2, md: 3 }}
      px={{ base: 4, md: 8 }}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={100}
      bg={headerBg}
      w="full"
    >
      <Flex align="center" maxW="container.xl" mx="auto" w="full">
        <Link href="/">
          <Heading size="md" color={headingColor} letterSpacing={0.5}>
            Legal Doc Generator
          </Heading>
        </Link>
        <Spacer />
        {/* Desktop Nav */}
        <Flex display={{ base: "none", md: "flex" }} gap={3} align="center">
          {!user && (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  borderRadius="lg"
                  colorScheme="teal"
                  fontWeight={600}
                  fontSize="md"
                  px={5}
                  py={2}
                  _hover={{
                    bg: "#e3e8ee",
                    borderColor: "brand.accent",
                    color: "brand.accent",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="solid"
                  borderRadius="lg"
                  colorScheme="teal"
                  fontWeight={700}
                  fontSize="md"
                  px={5}
                  py={2}
                  _hover={{ bg: "#38b2ac" }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {user && (
            <>
              <Tooltip label="View your dashboard" placement="bottom">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    color={navTextColor}
                    leftIcon={<Icon as={FiClock} color={iconColor} />}
                    aria-label="View dashboard"
                    borderRadius="lg"
                    fontWeight={600}
                    fontSize="md"
                  >
                    Dashboard
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip label="Create a new document" placement="bottom">
                <Link href="/create">
                  <Button
                    variant="solid"
                    leftIcon={<Icon as={FiFileText} color={iconColor} />}
                    aria-label="Create new document"
                    borderRadius="lg"
                    colorScheme="teal"
                    fontWeight={700}
                    fontSize="md"
                    px={5}
                    py={2}
                    _hover={{ bg: "#38b2ac" }}
                  >
                    Create Document
                  </Button>
                </Link>
              </Tooltip>
              <IconButton
                aria-label={
                  colorMode === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                size="md"
                color={iconColor}
                borderRadius="lg"
                _hover={{
                  bg: useColorModeValue("brand.background", "#181A20"),
                }}
              />
              <Menu>
                <MenuButton>
                  <Flex align="center" gap={2}>
                    <Avatar
                      size="sm"
                      name={firstName}
                      bg="brand.accent"
                      _hover={{ opacity: 0.9 }}
                      transition="opacity 0.2s"
                    />
                    {/* <Text color={navTextColor}>Welcome, {firstName}</Text> */}
                  </Flex>
                </MenuButton>
                <MenuList
                  bg="white"
                  boxShadow="lg"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="brand.border"
                  py={2}
                  minW="200px"
                  px={2}
                >
                  <MenuItem
                    icon={<Icon as={FiSettings} color={iconColor} />}
                    onClick={() => router.push("/settings")}
                    px={4}
                    py={1}
                    _hover={{ bg: menuItemHoverBg }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    color="brand.danger"
                    px={4}
                    py={1}
                    _hover={{ bg: menuItemHoverBg }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
        {/* Mobile Nav */}
        <Box display={{ base: "flex", md: "none" }} alignItems="center">
          <IconButton
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            icon={menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            size="md"
            ml={2}
            onClick={() => setMenuOpen((open) => !open)}
            borderRadius="lg"
          />
        </Box>
      </Flex>
      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg="white"
          px={0}
          py={0}
          borderRadius="xl"
          boxShadow="lg"
          mt={2}
          minW="90vw"
          maxW="340px"
          mx="auto"
        >
          <Flex direction="column" align="stretch" p={4}>
            {user && (
              <>
                <Flex align="center" mb={4}>
                  <Avatar size="md" name={firstName} bg="brand.accent" mr={3} />
                  <Text fontWeight={700} fontSize="lg" color="brand.text.dark">
                    Welcome, {firstName}
                  </Text>
                </Flex>
                <VStack align="stretch" spacing={2}>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      color={navTextColor}
                      leftIcon={<Icon as={FiClock} color={iconColor} />}
                      aria-label="View dashboard"
                      borderRadius="lg"
                      fontWeight={600}
                      fontSize="md"
                      w="full"
                      justifyContent="flex-start"
                      onClick={() => setMenuOpen(false)}
                      _hover={{ bg: menuItemHoverBg }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/create">
                    <Button
                      variant="solid"
                      leftIcon={<Icon as={FiFileText} color={iconColor} />}
                      aria-label="Create new document"
                      borderRadius="lg"
                      colorScheme="teal"
                      fontWeight={700}
                      fontSize="md"
                      w="full"
                      justifyContent="flex-start"
                      onClick={() => setMenuOpen(false)}
                      _hover={{ bg: menuItemHoverBg }}
                    >
                      Create Document
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    leftIcon={
                      colorMode === "light" ? <MoonIcon /> : <SunIcon />
                    }
                    onClick={toggleColorMode}
                    borderRadius="lg"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: menuItemHoverBg }}
                  >
                    {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                  </Button>
                  <Divider my={2} />
                  <Button
                    variant="ghost"
                    color="red.500"
                    borderRadius="lg"
                    w="full"
                    justifyContent="flex-start"
                    onClick={handleLogout}
                    _hover={{ bg: menuItemHoverBg }}
                  >
                    Logout
                  </Button>
                </VStack>
              </>
            )}
            {!user && (
              <VStack align="stretch" spacing={2}>
                <Link href="/login">
                  <Button
                    variant="outline"
                    borderRadius="lg"
                    colorScheme="teal"
                    fontWeight={600}
                    fontSize="md"
                    w="full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="solid"
                    borderRadius="lg"
                    colorScheme="teal"
                    fontWeight={700}
                    fontSize="md"
                    w="full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </Link>
              </VStack>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
