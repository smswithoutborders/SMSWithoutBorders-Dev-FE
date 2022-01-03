import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LogIn } from "pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
