declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SALT_ROUNDS: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: number | string;
    NODE_ENV: 'dev' | 'prod';
  }
}
