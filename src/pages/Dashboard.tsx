import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { Wireframe } from "../components/wireframe";
import { getAllClients } from "../services/clients/getAllClients";
import { useQuery } from "react-query";
import { ReactNode, useMemo } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { sortByDate } from "../utils/sortByDate";
import { foundOccurences } from "../utils/foundOccurences";

export const Dashboard = () => {
  const { isLoading, data } = useQuery("getAllClients", () => getAllClients());

  const succesClients = useMemo(
    () => data?.filter((client) => client.status === "sucesso"),
    [data]
  );

  const errorClients = useMemo(
    () => data?.filter((client) => client.status === "falha"),
    [data]
  );

  const dataToUseInCards = useMemo(() => {
    const data = [succesClients, errorClients];
    return data.map((array) => {
      const sortedByDate = sortByDate(array || []);
      return foundOccurences(sortedByDate, "data");
    });
  }, [errorClients, succesClients]);

  interface IDataToBigChart {
    data: Date;
    sucesso?: number;
    erro?: number;
  }

  const dataToBigCharts = useMemo(() => {
    const success: IDataToBigChart[] = dataToUseInCards[0].map((item) => ({
      data: item.data,
      sucesso: item.occurrence,
    }));

    const error: IDataToBigChart[] = dataToUseInCards[1].map((item) => ({
      data: item.data,
      erro: item.occurrence,
    }));

    const concatSuccessAndWrong = success.concat(error);

    const groupData = concatSuccessAndWrong.reduce(
      (acummulator: IDataToBigChart[], currentValue) => {
        const indexResult = acummulator.find(
          (entrie: IDataToBigChart) => entrie.data === currentValue.data
        );
        if (indexResult) {
          acummulator[acummulator.indexOf(indexResult)] = {
            ...acummulator[acummulator.indexOf(indexResult)],
            ...currentValue,
          };
          return acummulator;
        } else {
          return [...acummulator, currentValue];
        }
      },
      []
    );

    return groupData.map((item) => {
      const { sucesso, erro } = item;

      return { ...item, sucesso, erro };
    });
  }, [dataToUseInCards]);

  const percentage = useMemo(() => {
    if (succesClients && errorClients) {
      return `${Number(
        (succesClients?.length * 100) /
          (succesClients?.length + errorClients?.length)
      ).toFixed(1)}%`;
    }
  }, [errorClients, succesClients]);

  const Card = useMemo(
    () =>
      ({
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
                    stroke={error ? "#24047C" : "#602BF8"}
                    strokeWidth="3px"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        );
      },
    []
  );

  const failureHappened = useMemo(() => {
    const failures: { motivo: string; occurrence: number }[] = foundOccurences(
      data,
      "motivo"
    );
    failures.shift();
    return failures;
  }, [data]);

  if (isLoading) {
    return (
      <Wireframe>
        <Flex w="100%" h="100%" minH="460px" align="center" justify="center">
          <Spinner />
        </Flex>
      </Wireframe>
    );
  }

  const COLORS = ["#602BF8", "#24047C"];

  return (
    <Wireframe>
      <Grid
        gridTemplateColumns={{ base: "1fr", xl: "repeat(3, 1fr)" }}
        mt="64px"
        gap="32px"
      >
        <Card
          numberToShow={succesClients?.length}
          text={"Backups bem sucedidos:"}
          icon={<AiOutlineCheckCircle />}
          data={dataToUseInCards[0]}
          iconColor="green"
        />
        <Card
          numberToShow={errorClients?.length}
          text={"Backups falhos:"}
          icon={<AiOutlineCloseCircle />}
          data={dataToUseInCards[1]}
          iconColor="red"
          error
        />
        {succesClients && errorClients && (
          <Box
            w="100%"
            boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
            p="32px"
            borderRadius="16px"
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
                    data={[
                      { value: succesClients.length },
                      { value: errorClients.length },
                    ]}
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
        )}
      </Grid>
      <Box
        width="100%"
        height="350px"
        boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
        p="32px"
        mt="32px"
        borderRadius="16px"
        display={{ base: "none", xl: "block" }}
      >
        <Text
          fontSize="26px"
          fontWeight="300"
          textTransform="uppercase"
          mb="16px"
        >
          Data dos backups:
        </Text>
        <ResponsiveContainer>
          <LineChart
            width={1000}
            height={350}
            data={dataToBigCharts}
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
              stroke="#602BF8"
              strokeWidth="3px"
            />
            <Line
              type="monotone"
              dataKey="erro"
              stroke="#24047C"
              strokeWidth="3px"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
        w="100%"
        h="350px"
        boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
        p="32px"
        borderRadius="16px"
        mt="32px"
        display={{ base: "none", xl: "block" }}
      >
        <Text
          fontSize="26px"
          fontWeight="300"
          textTransform="uppercase"
          mb="16px"
        >
          Falhas por categoria:
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={failureHappened}
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
            <Bar dataKey="occurrence" barSize={20} fill="#602BF8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Grid
        gridTemplateColumns="1fr"
        mt="32px"
        gap="32px"
        display={{ base: "grid", xl: "none" }}
      >
        {failureHappened.map((failure) => (
          <Box
            w="100%"
            boxShadow="0px 10px 35px -10px rgba(0,0,0,0.3)"
            p="32px"
            borderRadius="16px"
          >
            <Text fontSize="26px" fontWeight="300" textTransform="uppercase">
              {`falha: ${failure.motivo}`}
            </Text>
            <Text fontSize="64px" mt="8px" fontWeight="bold">
              {failure.occurrence}
            </Text>
          </Box>
        ))}
      </Grid>
    </Wireframe>
  );
};
