declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_STRING: string;
    JWT_SIGNATURE: string;
    COOKIE_SIGNATURE: string;
  }
}