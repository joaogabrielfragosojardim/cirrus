import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export const SimpleCard = ({
  motivo,
  occurrence,
}: {
  motivo: string;
  occurrence: number;
}) => (
  <Box
    w="100%"
    bg={useColorModeValue("white", "grayTheme")}
    boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
    p="32px"
    borderRadius="16px"
  >
    <Text fontSize="26px" fontWeight="300" textTransform="uppercase">
      {`falha: ${motivo}`}
    </Text>
    <Text fontSize="64px" mt="8px" fontWeight="bold">
      {occurrence}
    </Text>
  </Box>
);
