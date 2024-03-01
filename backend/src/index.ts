import { Hono } from "hono";
import apiV1Router from "./routes/apiV1Routes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.route("/api/v1", apiV1Router);

export default app;
