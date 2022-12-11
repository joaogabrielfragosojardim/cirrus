import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Wireframe } from "../components/wireframe";
import { getAllClients } from "../services/clients/getAllClients";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ClientDTO } from "../services/dtos/clientDTO";
import { HeaderTable } from "../components/HeaderTable";
import { DataTable } from "../components/DataTable";
import { useApiError } from "../hooks/useApiError";

export const InfosGerais = () => {
  const {
    isLoading,
    data: apiData,
    error,
  } = useQuery("getAllClients", () => getAllClients());
  useApiError(error);

  const [data, setData] = useState<ClientDTO[] | undefined>(apiData);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const columnHelper = createColumnHelper<ClientDTO>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "id do cliente",
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Status",
    }),
    columnHelper.accessor("motivo", {
      cell: (info) => info.getValue(),
      header: "Motivo",
    }),
    columnHelper.accessor("dataBr", {
      cell: (info) => info.getValue(),
      header: "Data",
    }),
  ];

  if (isLoading) {
    return (
      <Wireframe>
        <Flex w="100%" h="100%" minH="460px" align="center" justify="center">
          <Spinner />
        </Flex>
      </Wireframe>
    );
  }

  if (error) {
    return null;
  }

  return (
    <Box>
      {data && apiData && (
        <>
          <Wireframe>
            <HeaderTable apiData={apiData} setData={setData} />
            <DataTable columns={columns} data={data} />
          </Wireframe>
        </>
      )}
    </Box>
  );
};
