export function notFound(_req, res) {
  res.status(404).json({ ok: false, error: { message: "Not found", code: "NOT_FOUND" } });
}

