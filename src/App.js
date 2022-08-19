import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, RequireAuth, ScrollToTop } from "components";
import { Toaster } from "react-hot-toast";
import {
  LogIn,
  SignUp,
  Landing,
  NotFound,
  Products,
  Dashboard,
  Credentials,
} from "pages";

/* products */
import OpenAPI from "pages/products/OpenAPI";

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
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />

              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route
              path="dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="products" />} />
              <Route path="products">
                <Route index element={<Products />} />
                <Route path="openapi" element={<OpenAPI />} />
              </Route>
              <Route path="credentials" element={<Credentials />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
