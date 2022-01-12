// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
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
      query: ({ id, sessionID }) => ({
        url: `/users/${id}/token`,
        method: "POST",
        body: {
          session_id: sessionID,
        },
      }),
    }),
    updateCredentials: builder.mutation({
      query: ({ id, sessionID }) => ({
        url: `/users/${id}/token`,
        method: "PUT",
        body: {
          session_id: sessionID,
        },
      }),
    }),
    getDocs: builder.query({
      query: () => ({
        url: process.env.REACT_APP_DOCS_URL,
        responseHandler: (response) => response.text(), // expect response type to be text/plain
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateCredentialsMutation,
  useNewCredentialsMutation,
  useGetDocsQuery,
} = API;
