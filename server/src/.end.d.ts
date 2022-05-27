declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    PORT: string;
  }
}
