import { Flex, Grid, Spinner } from "@chakra-ui/react";
import { Wireframe } from "../components/wireframe";
import { getAllClients } from "../services/clients/getAllClients";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { sortByDate } from "../utils/sortByDate";
import { foundOccurences } from "../utils/foundOccurences";
import { Card } from "../components/Card";
import { PercentageCard } from "../components/PercentageCard";
import { BackupByData } from "../components/BackupByDate";
import { BackupByCategory } from "../components/BackupByCategory";
import { SimpleCard } from "../components/SimpleCard";

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
        {succesClients && errorClients && percentage && (
          <PercentageCard
            percentage={percentage}
            success={succesClients.length}
            error={errorClients.length}
          />
        )}
      </Grid>
      <BackupByData data={dataToBigCharts} />
      <BackupByCategory data={failureHappened} />
      <Grid
        gridTemplateColumns="1fr"
        mt="32px"
        gap="32px"
        display={{ base: "grid", xl: "none" }}
      >
        {failureHappened.map((failure) => (
          <SimpleCard motivo={failure.motivo} occurrence={failure.occurrence} />
        ))}
      </Grid>
    </Wireframe>
  );
};
