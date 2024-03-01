import { Hono } from "hono";
// import { createNewUser } from "../controllers/userController";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
export default router;

router.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  let user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      status: "error",
      message: "Email already exists",
    });
  }

  user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    status: "success",
    data: {
      jwt,
    },
  });
});

router.post("/signin", (c) => {
  return c.text("SIGNIN");
});
