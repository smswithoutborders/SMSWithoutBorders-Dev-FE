import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "components";
import { Toaster } from "react-hot-toast";
import {
  Docs,
  LogIn,
  SignUp,
  NotFound,
  Projects,
  Dashboard,
  Credentials,
} from "pages";

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
            <Route path="projects" element={<Projects />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="docs" element={<Docs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
