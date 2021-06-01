export const REST_BASE_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `https://fastify-auth.dev`
    : "http://localhost:5000";

export const REST_BASE_ENDPOINT_CADDY =
  process.env.NODE_ENV === "production"
    ? `https://fastify-auth.dev`
    : "http://localhost:5000";
// :"https://fastify-auth.dev";

export const URL =
  process.env.NODE_ENV === "production" ? "fastify-auth.dev" : "localhost:3000";
