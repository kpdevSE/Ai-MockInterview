/**@type {import {"drizzle-kit"}.config} */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker-app_owner:U2GJfdLa4Ybl@ep-still-meadow-a5zddllu.us-east-2.aws.neon.tech/ai-interview-mocker-app?sslmode=require",
  },
};
