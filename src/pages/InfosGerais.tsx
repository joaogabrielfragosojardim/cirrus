import {
  Box,
  Flex,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Select,
  Button,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Wireframe } from "../components/wireframe";
import { getAllClients } from "../services/clients/getAllClients";
import { useQuery } from "react-query";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IoCloseSharp, IoCalendarClearOutline } from "react-icons/io5";
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ClientDTO } from "../services/dtos/clientDTO";

export const InfosGerais = () => {
  const { isLoading, data: apiData } = useQuery("getAllClients", () =>
    getAllClients()
  );
  const toast = useToast();

  const [data, setData] = useState<ClientDTO[] | undefined>(apiData);

  const [resetOption, setResetOption] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");

  const [resetDate, setResetDate] = useState<boolean>(false);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const options = useMemo(() => {
    const failures = [...new Set(apiData?.map((item) => item.motivo))];
    const blank = failures.indexOf("");
    failures.splice(blank, 1);
    return failures;
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

  type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
  };

  function DataTable<Data extends object>({
    data,
    columns,
  }: DataTableProps<Data>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },
    });

    const filterTable = useCallback(() => {
      // estava obtendo resultados estranhos ao usar um setState
      // dentro do  onChange do input type date, optei por usar
      // o velho e bom DOM nesse caso das datas

      const firstDate = new Date(
        (document.getElementById("first") as HTMLInputElement).value
      ).getTime();

      const finalDate = new Date(
        (document.getElementById("final") as HTMLInputElement).value
      ).getTime();

      if (firstDate && finalDate && firstDate > finalDate) {
        return toast({
          title: "Erro!",
          description: "Data inicial maior que a data final",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }
      if (firstDate && finalDate) {
        const filteredData = apiData?.filter((data) => {
          const dateTimer = new Date(data.data).getTime();
          const isInData = dateTimer >= firstDate && dateTimer <= finalDate;

          return isInData;
        });

        setTimeout(() => {
          setData(filteredData);
        }, 2.5 * 100);
      }
    }, []);

    return (
      <>
        <Flex
          w="100%"
          justify={{ base: "flex-start", xl: "flex-end" }}
          gap="16px"
          mb="64px"
        >
          <Flex
            gap="16px"
            align={{ base: "unset", xl: "center" }}
            flexDir={{ base: "column", xl: "row" }}
            w={{ base: "100%", xl: "unset" }}
          >
            {resetDate && (
              <Button
                color="red"
                bg="transparent"
                fontSize="32px"
                onClick={() => {
                  setResetDate(false);
                }}
                mt="32px"
              >
                <IoCloseSharp />
              </Button>
            )}
            <Box>
              <FormLabel ml={{ base: "6px", xl: "42px" }} mb="8px">
                Data Inicial
              </FormLabel>
              <Flex
                align="center"
                gap="16px"
                flexDir={{ base: "row-reverse", xl: "row" }}
              >
                <Box fontSize="22px">
                  <IoCalendarClearOutline />
                </Box>
                <Input type="date" id="first" onChange={filterTable} />
              </Flex>
            </Box>
            <Box>
              <FormLabel ml={{ base: "6px", xl: "42px" }} mb="8px">
                Data Final
              </FormLabel>
              <Flex
                align="center"
                gap="16px"
                flexDir={{ base: "row-reverse", xl: "row" }}
              >
                <Box fontSize="22px">
                  <IoCalendarClearOutline />
                </Box>
                <Input type="date" id="final" onChange={filterTable} />
              </Flex>
            </Box>
            <Flex gap="16px" mt="32px">
              {resetOption && (
                <Button
                  color="red"
                  bg="transparent"
                  fontSize="32px"
                  onClick={() => {
                    setData(apiData);
                    setResetOption(false);
                  }}
                >
                  <IoCloseSharp />
                </Button>
              )}
              <Select
                placeholder="Filtrar motivos"
                maxW={{ base: "unset", xl: "300px" }}
                onChange={(e) => {
                  setOption(e.target.value);
                  setResetOption(true);
                }}
              >
                {options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </Flex>
        <Box mt="32px" overflowX="auto">
          <Table w="100%" minW="642px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const meta: any = header.column.columnDef.meta;
                    return (
                      <Th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        isNumeric={meta?.isNumeric}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <chakra.span pl="4">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null}
                        </chakra.span>
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  _hover={{ bg: "#602BF8", color: "white" }}
                  transition="0.3s"
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta: any = cell.column.columnDef.meta;
                    return (
                      <Td key={cell.id} isNumeric={meta?.isNumeric}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </>
    );
  }

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
      <Box mt="32px">{data && <DataTable columns={columns} data={data} />}</Box>
    </Wireframe>
  );
};
