import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, VStack, Input, Text } from "@chakra-ui/react";
import Carla from "./CarlFTG";

function App() {
    const [count, setCount] = useState(0);
    const [nom, setNom] = useState("");

    console.log(import.meta.env.VITE_PASSWORD);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <VStack my={3} spacing={5}>
                    <Button
                        colorScheme="blue"
                        size="md"
                        isLoading={count === 5}
                        onClick={() => setCount((count) => count + 1)}
                    >
                        count is: {count}
                    </Button>

                    {Math.abs(count) === 5 && (
                        <>
                            <Input
                                colorScheme="blue"
                                variant="outline"
                                placeholder="Mon Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            <Text> {nom} </Text>
                        </>
                    )}
                    <Button
                        colorScheme="yellow"
                        variant="ghost"
                        onClick={() => {
                            if (count > 0) setCount((count) => count - 1);
                        }}
                    >
                        count is: {count}
                    </Button>
                </VStack>
                <p>
                    Edit <code>App.jsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                    {" | "}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}

export default App;
