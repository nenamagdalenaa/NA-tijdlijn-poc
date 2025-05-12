"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";

// Apollo Client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}