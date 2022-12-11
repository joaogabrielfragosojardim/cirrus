import {
  Box,
  Flex,
  Select,
  Button,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { IoCloseSharp, IoCalendarClearOutline } from "react-icons/io5";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ClientDTO } from "../services/dtos/clientDTO";
import { sortByDate } from "../utils/sortByDate";

export const HeaderTable = ({
  apiData,
  setData,
}: {
  apiData: ClientDTO[];
  setData: React.Dispatch<React.SetStateAction<ClientDTO[] | undefined>>;
}) => {
  const [resetOption, setResetOption] = useState<boolean>(false);
  const [option, setOption] = useState<string>();

  const [firstDate, setFirstDate] = useState<number>();
  const [finalDate, setFinalDate] = useState<number>();
  const [resetDate, setResetDate] = useState<boolean>(false);

  const toast = useToast();

  const firstDateRef = useRef<HTMLInputElement>(null);
  const finalDateRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const options = useMemo(() => {
    const failures = [...new Set(apiData?.map((item) => item.motivo))];
    return failures;
  }, [apiData]);

  const dateSorted = useMemo(() => {
    const sorted = sortByDate(apiData);
    return [sorted[0].data.toString(), sorted.pop()?.data.toString()];
  }, [apiData]);

  const resetDates = useCallback(() => {
    setResetDate(false);
    setFirstDate(0);
    setFinalDate(0);
    if (firstDateRef?.current?.value) firstDateRef.current.value = "";
    if (finalDateRef?.current?.value) finalDateRef.current.value = "";
  }, []);

  const resetOptions = useCallback(() => {
    setResetOption(false);
    setOption("");
    if (selectRef?.current?.value) selectRef.current.value = "";
  }, []);

  useEffect(() => {
    if (firstDate && finalDate && firstDate > finalDate) {
      toast({
        title: "Erro!",
        description: "Data inicial maior que a data final",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const filteredData = apiData?.filter((data) => {
      const dateTimer = new Date(data.data).getTime();

      let isInDate = true;

      if (firstDate && finalDate) {
        isInDate = dateTimer >= firstDate && dateTimer <= finalDate;
      }

      const isInOption = option ? data.motivo === option : true;

      return isInDate && isInOption;
    });

    setData(filteredData);
  }, [apiData, finalDate, firstDate, option, setData, toast]);

  return (
    <Flex
      w="100%"
      justify={{ base: "flex-start", xl: "flex-end" }}
      gap="16px"
      mb="64px"
      mt={{ base: "64px", xl: "unset" }}
    >
      <Flex
        gap="16px"
        align={{ base: "unset", xl: "center" }}
        flexDir={{ base: "column", xl: "row" }}
        w={{ base: "100%", xl: "unset" }}
      >
        {resetDate && (
          <Flex>
            <Button
              color="red"
              bg="transparent"
              fontSize="23px"
              onClick={resetDates}
              mt="32px"
            >
              <IoCloseSharp />
            </Button>
          </Flex>
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
            <Input
              type="date"
              onChange={(event) => {
                setFirstDate(new Date(event.target.value).getTime());
                setResetDate(true);
              }}
              ref={firstDateRef}
              min={dateSorted[0]}
              max={dateSorted[1]}
            />
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
            <Input
              type="date"
              onChange={(event) => {
                setFinalDate(new Date(event.target.value).getTime());
                setResetDate(true);
              }}
              ref={finalDateRef}
              min={dateSorted[0]}
              max={dateSorted[1]}
            />
          </Flex>
        </Box>
        <Flex gap="16px" mt="32px">
          {resetOption && (
            <Button
              color="red"
              bg="transparent"
              fontSize="32px"
              onClick={resetOptions}
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
            ref={selectRef}
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
  );
};
