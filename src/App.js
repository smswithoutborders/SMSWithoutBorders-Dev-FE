import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogIn, SignUp, Dashboard, Credentials } from "pages";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Fragment>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
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
    </Fragment>
  );
};

export default App;
