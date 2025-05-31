"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Card,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading as="h1" size="2xl">
          Legal Document Generator
        </Heading>
        <Text fontSize="xl" textAlign="center" color="brand.text.light">
          Generate professional legal documents with AI assistance
        </Text>
        <Card>
          <Link href="/create">
            <Button variant="solid" size="lg">
              Create Document
            </Button>
          </Link>
        </Card>
      </VStack>
    </Container>
  );
}
