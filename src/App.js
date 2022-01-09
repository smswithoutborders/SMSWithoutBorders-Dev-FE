import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LogIn, SignUp, Dashboard, Credentials } from "pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Credentials />} />
          <Route path="credentials" element={<Credentials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
