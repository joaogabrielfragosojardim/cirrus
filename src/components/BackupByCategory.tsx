import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const BackupByCategory = ({
  data,
}: {
  data: {
    motivo: string;
    occurrence: number;
  }[];
}) => (
  <Box
    w="100%"
    h="350px"
    boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
    bg={useColorModeValue("white", "grayTheme")}
    p="32px"
    borderRadius="16px"
    mt="32px"
    display={{ base: "none", xl: "block" }}
  >
    <Text fontSize="26px" fontWeight="300" textTransform="uppercase" mb="16px">
      Falhas por categoria:
    </Text>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 5,
          left: -40,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="motivo" />
        <YAxis />
        <Bar
          dataKey="occurrence"
          barSize={20}
          fill="var(--chakra-colors-primary)"
        />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);
