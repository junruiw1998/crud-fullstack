import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Todolist from "./pages/Todolist";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Todolist />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
