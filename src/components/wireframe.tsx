import {
  Box,
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Menu } from "./Menu";
import { BsMoon, BsSun } from "react-icons/bs";

export const Wireframe = ({ children }: { children: ReactNode }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      p={{ base: "0px", md: "128px" }}
      minH="100vh"
      w="100%"
      bg={useColorModeValue("bgsoft", "grayTheme")}
      align="center"
      justify="center"
      pos="relative"
    >
      <Box
        w="100%"
        h="100%"
        borderRadius={{ base: "none", md: "16px" }}
        bg={useColorModeValue("white", "black")}
        p="52px"
        minH="620px"
      >
        <Box
          pos="fixed"
          left={{ base: "6px", md: "92px" }}
          top={{ base: "26px", md: "260px" }}
          zIndex={"10"}
        >
          <Menu />
        </Box>
        <Flex justify="space-between">
          <Text fontSize="32px" fontWeight="bold">
            Cirrus Dashboard
          </Text>
          <Button onClick={toggleColorMode} borderRadius="50%">
            {colorMode === "dark" ? (
              <BsMoon />
            ) : (
              <BsSun width="32px" height="32px" />
            )}
          </Button>
        </Flex>

        <Box>{children}</Box>
      </Box>
    </Flex>
  );
};
