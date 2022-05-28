import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Home from "./views/Home";

function App() {
  return (
    <Box w="100vw" h="100vh" bgColor="#fff">
      <Home />
    </Box>
  );
}

export default App;
