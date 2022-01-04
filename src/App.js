import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LogIn, SignUp, Dashboard } from "pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="credentials" />
          <Route path="docs" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
