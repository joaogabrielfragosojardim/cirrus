import { Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import { menu } from "../routes/routes";
import { FiArrowRight } from "react-icons/fi";

export const Menu = () => (
  <>
    <Flex
      flexDir="column"
      gap="16px"
      bg="#602BF8"
      color="white"
      p="16px"
      borderRadius="64px"
      display={{ base: "none", md: "flex" }}
    >
      {menu.map((item) => (
        <Flex
          key={item.name}
          fontSize="24px"
          h="37px"
          w="37px"
          borderRadius="100%"
          align="center"
          justify="center"
          transition="0.3s"
          _hover={{ bg: "#24047C" }}
        >
          <Link href={item.path}>
            <Tooltip label={item.name} placement="right">
              <Box>{item.icon}</Box>
            </Tooltip>
          </Link>
        </Flex>
      ))}
    </Flex>
    <Box
      flexDir="column"
      gap="16px"
      bg="#602BF8"
      color="white"
      p="16px"
      borderRadius="64px"
      display={{ base: "block", md: "none" }}
    >
      <FiArrowRight />
    </Box>
  </>
);
