import dotenv from "dotenv";
dotenv.config();
import { fastify } from "fastify";
import fastifyStatic from "fastify-static";
import fastifyCookie from "fastify-cookie";
import fastifyCors from "fastify-cors";
import path from "path";
import { db } from "./mongoConfig/mongo";
import { __prod_cors__ } from "./constants";
// import { fileURLToPath } from "url"
import { registerUser } from "./accounts/register";
import { authorizeUser } from "./accounts/authorize";
import { logUserIn } from "./accounts/logUserIn";
import { logUserOut } from "./accounts/logUserOut";
import { getUserFromCookies } from "./accounts/user";
// import { sendEmail, mailInit } from "./mail/index.js"
// import { createVerifyEmailLink } from "./accounts/verify.js"

const app = fastify();

async function startApp() {
  try {
    // await mailInit();

    const corsConfig = __prod_cors__;
    app.register(fastifyCors, corsConfig);

    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE,
    });

    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.post("/api/register", {}, async (request: any, reply: any) => {
      try {
        const userId = await registerUser(
          request.body.email,
          request.body.password
        );
        // If account creations was successful
        if (userId) {
          // const emailLink = await createVerifyEmailLink(request.body.email);
          // await sendEmail({
          //   to: request.body.email,
          //   subject: "Verify your email",
          //   html: `<a href="${emailLink}">verify</a>`,
          // });

          await logUserIn(userId, request, reply);
          reply.send({
            data: {
              status: "SUCCESS",
              userId,
            },
          });
        }
      } catch (e) {
        console.error(e);
        reply.send({
          data: {
            status: "FAILED",
            // userId,
          },
        });
      }
    });

    app.post("/api/authorize", {}, async (request: any, reply: any) => {
      console.log("hitting api authorize");
      try {
        const { isAuthorized, userId } = await authorizeUser(
          request.body.email,
          request.body.password
        );
        if (isAuthorized) {
          await logUserIn(userId, request, reply);
          reply.send({
            data: {
              status: "SUCCESS",
              userId,
            },
          });
        }
      } catch (e) {
        console.error(e);
        reply.send({
          data: {
            status: "FAILED",
            // userId,
          },
        });
      }
    });

    app.post("/api/logout", {}, async (request: any, reply: any) => {
      try {
        await logUserOut(request, reply);
        reply.send({
          data: {
            status: "SUCCESS",
          },
        });
      } catch (e) {
        console.error(e);
        reply.send({
          data: {
            status: "FAILED",
            // userId,
          },
        });
      }
    });

    app.get("/test", {}, async (request: any, reply: any) => {
      try {
        // Verify user login
        const user = await getUserFromCookies(request, reply);
        // Return user email, if it exists, otherwise return unauthorized
        if (user?._id) {
          reply.send({
            data: user,
          });
        } else {
          reply.send({
            data: "User Lookup Failed",
          });
        }
      } catch (e) {
        throw new Error(e);
      }
    });

    await app.listen(5000);
    console.log("🚀 Server Listening at port: 5000");
  } catch (e) {
    console.error(e);
  }
}

startApp();
