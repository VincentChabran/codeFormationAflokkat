import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App2 from "./App2";
import Content from "./components/Content";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <App2 />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
