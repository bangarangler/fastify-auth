export const __prod_cors__ =
  process.env.NODE_ENV !== "production"
    ? {
        origin: [
          "http://localhost:3000",
          "http://localhost:5000",
          // "http://localhost:5000/graphql",
          // "ws://localhost:5000/graphql",
          // "https://studio.apollographql.com",
        ],
        credentials: true,
      }
    : {
        origin: [
          // "https://nodereacttesting.nowigence.ai",
          "https://fastify-auth.dev",
          // "ws://bang-k8s.com",
          // "wss://nodereacttesting.nowigence.ai",
          // "https://bang-k8s.com",
        ],
        credentials: true,
      };
