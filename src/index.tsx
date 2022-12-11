import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

import { QueryClient, QueryClientProvider } from "react-query";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
