// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    newCredentials: builder.mutation({
      query: ({ uid }) => ({
        url: `/users/${uid}/tokens`,
        method: "GET",
      }),
    }),
    getProducts: builder.query({
      query: ({ uid }) => ({
        url: `/users/${uid}/projects`,
        method: "GET",
      }),
    }),
    subscription: builder.mutation({
      query: ({ uid, product }) => ({
        url: `/users/${uid}/projects/${product}`,
        method: "POST",
      }),
    }),
    getDocs: builder.query({
      query: () => ({
        url: process.env.REACT_APP_DOCS_URL,
        credentials: "omit",
        headers: {
          "content-type": "text/plain",
        },
        responseHandler: (response) => response.text(), // expect response type to be text/plain
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDocsQuery,
  useLoginMutation,
  useSignupMutation,
  useGetProductsQuery,
  useSubscriptionMutation,
  useNewCredentialsMutation,
  useUpdateCredentialsMutation,
} = API;
