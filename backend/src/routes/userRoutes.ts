import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput } from "@mcace007/medium-common";
import { sign } from "hono/jwt";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const responseMessage = {
  invalidInputs400: "Invalid input. Please check your request and try again.",
  emailAlreadyInUse409:
    "Failed to create user. The email address is already in use.",
  userDoesNotExits404: "The user does not exist.",
};

router.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      status: "error",
      message: responseMessage.invalidInputs400,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET,
    );

    return c.json({
      status: "success",
      data: {
        jwt,
      },
    });
  } catch (e) {
    console.log(e);
    c.status(409);
    return c.json({
      status: "error",
      message: responseMessage.emailAlreadyInUse409,
    });
  }
});

router.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      status: "error",
      message: responseMessage.invalidInputs400,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({
        status: "error",
        message: responseMessage.userDoesNotExits404,
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET,
    );

    return c.json({
      status: "success",
      data: {
        jwt,
      },
    });
  } catch (e) {
    console.log(e);
    c.status(409);
    return c.json({
      status: "error",
      message: responseMessage.userDoesNotExits404,
    });
  }
});

export default router;
