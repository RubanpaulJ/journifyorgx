import { verifyJwt } from "../lib/jwt.js";

export function requireAuth(req, _res, next) {
  const auth = req.headers.authorization || "";
  const [, token] = auth.split(" ");
  if (!token) {
    const err = new Error("Missing token");
    err.statusCode = 401;
    err.code = "AUTH_MISSING";
    throw err;
  }
  try {
    req.user = verifyJwt(token);
    return next();
  } catch {
    const err = new Error("Invalid token");
    err.statusCode = 401;
    err.code = "AUTH_INVALID";
    throw err;
  }
}

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "admin") {
    const err = new Error("Admin access required");
    err.statusCode = 403;
    err.code = "AUTH_FORBIDDEN";
    throw err;
  }
  return next();
}

