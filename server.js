import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import initSqlJs from "sql.js";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.join(rootDir, "data");
const databasePath = process.env.SQLITE_PATH || path.join(dataDir, "cbt.sqlite");
const port = Number(process.env.PORT || 3000);

mkdirSync(path.dirname(databasePath), { recursive: true });

const SQL = await initSqlJs();
const db = existsSync(databasePath)
  ? new SQL.Database(readFileSync(databasePath))
  : new SQL.Database();

const passwordHash = (password) =>
  createHash("sha256").update(password).digest("hex");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

const hasUsers = db.exec("SELECT 1 FROM users LIMIT 1").length > 0;
if (!hasUsers) {
  const addUser = db.prepare(
    "INSERT INTO users (username, password_hash, display_name, role) VALUES (?, ?, ?, ?)",
  );
  addUser.run(["admin", passwordHash("cst@123"), "Admin User", "Administrator"]);
  addUser.run(["tiger", passwordHash("tiger@123"), "Tiger Thomas", "Supply Planner"]);
  addUser.free();
  db.run(
    "INSERT OR REPLACE INTO app_settings (key, value) VALUES ('application_name', 'Commodity Buying Tool')",
  );
}

const saveDatabase = () => writeFileSync(databasePath, Buffer.from(db.export()));
saveDatabase();

const app = express();
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", database: "sqlite" });
});

app.post("/api/auth/login", (request, response) => {
  const { username, password } = request.body || {};
  if (!username || !password) {
    return response.status(400).json({ message: "Username and password are required." });
  }

  const result = db.exec(
    "SELECT username, display_name, role, password_hash FROM users WHERE username = ?",
    [username],
  );
  const row = result[0]?.values[0];
  if (!row || row[3] !== passwordHash(password)) {
    return response.status(401).json({ message: "Invalid username or password." });
  }

  return response.json({
    user: { username: row[0], displayName: row[1], role: row[2] },
  });
});

app.use(express.static(path.join(rootDir, "dist")));
app.use((_request, response) => {
  response.sendFile(path.join(rootDir, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Commodity Buying Tool running on port ${port} with SQLite at ${databasePath}`);
});
