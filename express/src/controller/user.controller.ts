import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser, findUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { findSession } from "../service/session.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.send(omit(user, "password"));
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    if (!res.locals.user) {
      console.error("No User");
      res.status(404).send("No User");
      return;
    }

    const sessionId = res.locals.user.session;

    if (!sessionId) {
      console.error("No Session ID");
      res.status(404).send("No Session ID");
      return;
    }

    const session = await findSession({ _id: sessionId });

    if (!session) {
      res.status(404).send("Session not found");
      return;
    }

    const userId = session.user;

    const user = await findUser({ _id: userId });

    res.send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
