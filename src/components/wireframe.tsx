import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Menu } from "./Menu";

export const Wireframe = ({ children }: { children: ReactNode }) => (
  <Flex
    p={{ base: "0px", md: "128px" }}
    minH="100vh"
    w="100%"
    bg="#DBE8F4"
    align="center"
    justify="center"
    pos="relative"
  >
    <Box
      w="100%"
      h="100%"
      bg="white"
      borderRadius={{ base: "none", md: "16px" }}
      p="52px"
    >
      <Box
        pos="fixed"
        left={{ base: "6px", md: "92px" }}
        top={{ base: "26px", md: "260px" }}
        zIndex={"10"}
      >
        <Menu />
      </Box>
      <Text fontSize="32px" fontWeight="bold">
        Cirrus Dashboard
      </Text>
      <Box>{children}</Box>
    </Box>
  </Flex>
);
