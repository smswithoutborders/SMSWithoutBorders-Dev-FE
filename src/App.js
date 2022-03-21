import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LogIn, SignUp, Dashboard, Credentials, Docs } from "pages";
import { RequireAuth } from "components";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Fragment>
      <Toaster
        position="top-right"
        containerClassName="mt-20"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/dashboard" />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<Credentials />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="docs" element={<Docs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
