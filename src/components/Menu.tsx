import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { menu } from "../routes/routes";
import { FiArrowRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";

export const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
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
      <Button
        flexDir="column"
        gap="16px"
        bg="#602BF8"
        color="white"
        p="16px"
        w="42px"
        h="42px"
        borderRadius="64px"
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
      >
        <FiArrowRight />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex justify="flex-end">
              <Button
                mt="32px"
                fontSize="22px"
                bg="transparent"
                onClick={onClose}
              >
                <MdClose />
              </Button>
            </Flex>
            <Flex mt="64px" flexDir="column" gap="16px">
              {menu.map((item) => (
                <Flex
                  key={item.name}
                  fontSize="24px"
                  borderRadius="100%"
                  align="center"
                  transition="0.3s"
                >
                  <Link href={item.path}>
                    <Flex gap="16px">
                      <Box fontSize="32px">{item.icon}</Box>
                      <Box>
                        <Text>{item.name}</Text>
                      </Box>
                    </Flex>
                  </Link>
                </Flex>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
