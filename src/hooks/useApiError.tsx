import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export const useApiError = (error: unknown) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro!",
        description: "Algo de errado com a API!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [error, toast]);
};
