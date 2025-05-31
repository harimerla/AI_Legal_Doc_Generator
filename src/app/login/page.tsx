"use client";

import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link as ChakraLink,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { signIn } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const FIREBASE_ERRORS: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  // Add more as needed
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      const code = error.code || "";
      setError(
        FIREBASE_ERRORS[code] ||
          error.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      bg="#e3e8ee"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box flexShrink={0} h={{ base: 4, md: 8 }} />
      <Stack
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        w="full"
      >
        <Avatar bg="brand.accent" size="lg" mb={1} boxSize={14} />
        <Heading
          color="brand.accent"
          mb={1}
          size="lg"
          fontWeight={700}
          letterSpacing={0.5}
          fontSize="2xl"
        >
          Welcome
        </Heading>
        <Box minW={{ base: "95%", sm: "320px", md: "360px" }} maxW="360px">
          {error && (
            <Alert status="error" borderRadius="md" mb={4}>
              <AlertIcon />
              <AlertTitle fontSize="md" mr={2}>
                Error
              </AlertTitle>
              <AlertDescription fontSize="sm">{error}</AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setError("")}
              />
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p={5}
              bg="white"
              boxShadow="0 8px 32px rgba(44,62,80,0.13)"
              borderRadius="xl"
              align="center"
            >
              <FormControl isRequired>
                <InputGroup size="md" w="100%">
                  <InputLeftElement pointerEvents="none" h="full" pl={1}>
                    <CFaUserAlt color="gray.300" boxSize={5} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="email"
                    pl={10}
                    w="100%"
                    fontSize="md"
                    borderRadius="lg"
                    borderWidth={2}
                    borderColor="brand.border"
                    _focus={{
                      borderColor: "brand.accent",
                      boxShadow: "0 0 0 2px #B2F5EA",
                    }}
                    h={12}
                    _placeholder={{
                      color: "gray.300",
                      fontWeight: 400,
                      fontSize: "md",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <Stack spacing={1} w="100%">
                  <InputGroup size="md" w="100%">
                    <InputLeftElement pointerEvents="none" h="full" pl={1}>
                      <CFaLock color="gray.300" boxSize={5} />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      autoComplete="current-password"
                      pl={10}
                      w="100%"
                      fontSize="md"
                      borderRadius="lg"
                      borderWidth={2}
                      borderColor="brand.border"
                      _focus={{
                        borderColor: "brand.accent",
                        boxShadow: "0 0 0 2px #B2F5EA",
                      }}
                      h={12}
                      _placeholder={{
                        color: "gray.300",
                        fontWeight: 400,
                        fontSize: "md",
                      }}
                    />
                    <InputRightElement
                      h="full"
                      pr={1}
                      top="0"
                      bottom="0"
                      right="0"
                      display="flex"
                      alignItems="center"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShowClick}
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        title={showPassword ? "Hide password" : "Show password"}
                        _focus={{ boxShadow: "0 0 0 2px #B2F5EA" }}
                        p={1.5}
                        minW={0}
                        bg="transparent"
                        _hover={{ bg: "gray.100" }}
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} color="#38b2ac" />
                        ) : (
                          <FiEye size={18} color="#38b2ac" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Box w="100%" textAlign="right" mt={0} mb={0} pr={1}>
                    <ChakraLink
                      as={Link}
                      href="#"
                      color="brand.accent"
                      fontSize="sm"
                      fontWeight={500}
                      textDecoration="underline"
                      _focus={{ color: "brand.accent" }}
                    >
                      forgot password?
                    </ChakraLink>
                  </Box>
                </Stack>
              </FormControl>
              <Button
                borderRadius="lg"
                type="submit"
                variant="solid"
                width="full"
                isLoading={loading}
                aria-label="Login"
                fontWeight={700}
                fontSize="lg"
                h={12}
                mt={1}
                bg="brand.accent"
                color="white"
                _hover={{ bg: "#38b2ac" }}
                boxShadow="md"
                _focus={{ boxShadow: "0 0 0 2px #B2F5EA" }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={8} textAlign="center">
        <Text fontSize="md" color="brand.text.dark">
          New to us?{" "}
          <ChakraLink
            as={Link}
            href="/signup"
            color="brand.accent"
            fontWeight={700}
            textDecoration="underline"
            fontSize="md"
            _hover={{ color: "teal.500", textDecoration: "underline" }}
          >
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}
