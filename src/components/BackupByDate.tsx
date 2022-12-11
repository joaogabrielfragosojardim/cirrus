import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const BackupByData = ({
  data,
}: {
  data: {
    sucesso: number | undefined;
    erro: number | undefined;
    data: Date;
  }[];
}) => (
  <Box
    bg={useColorModeValue("white", "grayTheme")}
    width="100%"
    height="350px"
    boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
    p="32px"
    mt="32px"
    borderRadius="16px"
    display={{ base: "none", xl: "block" }}
  >
    <Text fontSize="26px" fontWeight="300" textTransform="uppercase" mb="16px">
      Data dos backups:
    </Text>
    <ResponsiveContainer>
      <LineChart
        width={1000}
        height={350}
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: -15,
          bottom: 55,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Legend />
        <Line
          type="monotone"
          dataKey="sucesso"
          stroke="var(--chakra-colors-primary)"
          strokeWidth="3px"
        />
        <Line
          type="monotone"
          dataKey="erro"
          stroke="var(--chakra-colors-secondary)"
          strokeWidth="3px"
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);
