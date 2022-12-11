import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { Cell, Pie, PieChart } from "recharts";

export const PercentageCard = ({
  percentage,
  success,
  error,
}: {
  percentage: string;
  success: number;
  error: number;
}) => {
  const COLORS = [
    "var(--chakra-colors-primary)",
    "var(--chakra-colors-secondary)",
  ];

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
          Taxa de sucesso:
        </Text>
      </Flex>
      <Text fontSize="64px" mt="8px" fontWeight="bold">
        {percentage}
      </Text>
      <Flex width="100%" height="100%" align="center" justify="center">
        <Box mb="30px" mt="-60px">
          <PieChart width={200} height={200}>
            <Pie
              data={[{ value: success }, { value: error }]}
              cx={100}
              cy={70}
              innerRadius={60}
              outerRadius={75}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
            >
              {[0, 0].map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
      </Flex>
    </Box>
  );
};
