import { Hono } from "hono";
import userRouter from "./userRoutes";
import blogRouter from "./blogRoutes";

const router = new Hono();

router.route("/user", userRouter);
router.route("/blog", blogRouter);

export default router;
