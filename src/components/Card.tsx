import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export const Card = ({
  icon,
  text,
  data,
  iconColor,
  numberToShow,
  error,
}: {
  icon: ReactNode;
  text: string;
  data: { occurrence: number }[] | undefined;
  iconColor: string;
  numberToShow: number | undefined;
  error?: boolean;
}) => {
  return (
    <Box
      w="100%"
      boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
      p="32px"
      borderRadius="16px"
      bg={useColorModeValue("white", "grayTheme")}
    >
      <Flex align="center" justify="space-between" gap="16px">
        <Text fontSize="26px" fontWeight="300" textTransform="uppercase">
          {text}
        </Text>
        <Box color={iconColor} fontSize="36px">
          {icon}
        </Box>
      </Flex>
      <Text fontSize="64px" mt="8px" fontWeight="bold">
        {numberToShow}
      </Text>
      <Box width="100%" height="100%" mt="16px" mb="-64px">
        <ResponsiveContainer width="100%" height="100%" maxHeight={150}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 5,
              left: 5,
              bottom: 0,
            }}
          >
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="occurrence"
              stroke={
                error
                  ? "var(--chakra-colors-secondary)"
                  : "var(--chakra-colors-primary)"
              }
              strokeWidth="3px"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
