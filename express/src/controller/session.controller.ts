import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import config from "config";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
      res.status(401).send("Invalid email or password");
      return;
    }

    const session = await createSession(
      user._id.toString(),
      req.get("user-agent") || ""
    );

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") }
    );

    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.send({ accessToken, user });
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e.message);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    path: "/",
    domain: "localhost",
  });

  res.send({ accessToken: null, refreshToken: null });
}

export async function refreshTokenHandler(req: Request, res: Response) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const { decoded } = verifyJwt(refreshToken);

  if (!decoded) {
    res.sendStatus(401);
    return;
  }

  let session;
  if (typeof decoded !== "string" && decoded.session) {
    session = await findSession({ _id: decoded.session, valid: true });
  } else {
    res.sendStatus(401);
    return;
  }

  if (!session) {
    res.sendStatus(401);
    return;
  }

  const { exp, ...payload } = decoded;

  const accessToken = signJwt(
    { ...payload, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  res.send({ accessToken });
}
