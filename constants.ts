export const ROOT_DOMAIN =
  process.env.NODE_ENV !== "production" ? "localhost" : "fastify-auth.dev";
export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";
export const JWTSignature = process.env.JWT_SIGNATURE;

export const __prod_cors__ =
  process.env.NODE_ENV !== "production"
    ? {
        origin: [
          "http://localhost:3000",
          "http://localhost:5000",
          "http://fastify-auth.dev",
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
          "http://localhost:5000",
          // "ws://bang-k8s.com",
          "wss://nodereacttesting.nowigence.ai",
          // "https://bang-k8s.com",
        ],
        credentials: true,
      };
