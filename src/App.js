import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LogIn, SignUp } from "pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
