import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, extendTheme, useBreakpointValue } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { createClient, Provider, defaultExchanges, subscriptionExchange } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { createClient as createWSClient } from "graphql-ws";

import { getToken } from "./utils/token";
import App from "./App";

const wsClient = createWSClient({
   // url: "wss://wss.sc.lescanalous.com/wss",
   url: "ws://localhost:3000/graphql",
});

const client = createClient({
   // url: "https://wss.sc.lescanalous.com/api",
   url: "http://localhost:3000/graphql",
   fetchOptions: {
      credentials: "omit",
      headers: {
         Authorization: `Bearer ${getToken()}`,
      },
   },
   exchanges: [
      ...defaultExchanges,
      multipartFetchExchange,
      subscriptionExchange({
         forwardSubscription: (operation) => ({
            subscribe: (sink: any) => ({
               unsubscribe: wsClient.subscribe(operation, sink),
            }),
         }),
      }),
   ],
});

const queryClient = new QueryClient();

const theme = extendTheme({
   config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
   },
   breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "55em",
      xl: "80em",
      "2xl": "96em",
   },
});

render(
   <ChakraProvider theme={theme}>
      <Provider value={client}>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <ColorModeScript />
               <App />
            </BrowserRouter>
         </QueryClientProvider>
      </Provider>
   </ChakraProvider>,
   document.getElementById("root")
);
