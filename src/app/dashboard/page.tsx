"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Card,
} from "@chakra-ui/react";
import { useAuth } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();

  // Use first name if available, otherwise fallback to email prefix or 'User'
  let firstName = "User";
  if (user) {
    if (user.displayName) {
      firstName = user.displayName;
    } else if (user.email) {
      firstName = user.email.split("@")[0];
    }
  }

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading size="lg">Welcome, {firstName}</Heading>
          <Text mt={2} color="brand.text.light">
            Manage your legal documents
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card>
            <Heading size="md" mb={4}>
              Create New Document
            </Heading>
            <Text mb={4}>Generate a new legal document using AI</Text>
            <Link href="/create">
              <Button variant="solid">Get Started</Button>
            </Link>
          </Card>

          <Card>
            <Heading size="md" mb={4}>
              Recent Documents
            </Heading>
            <Text color="brand.text.light">No documents yet</Text>
          </Card>

          <Card>
            <Heading size="md" mb={4}>
              Account
            </Heading>
            <Text mb={4}>Manage your account settings</Text>
            <Button variant="outline">Settings</Button>
          </Card>
        </SimpleGrid>
      </Container>
    </ProtectedRoute>
  );
}
