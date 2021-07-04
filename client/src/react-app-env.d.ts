/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly REACT_APP_GOOGLE_CLIENT_ID: string
    readonly REACT_APP_FACEBOOK_APP_ID: string
    readonly REACT_APP_CLOUD_IMAGE_DB_URL: string
  }
}

