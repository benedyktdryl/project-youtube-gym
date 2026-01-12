import PgBoss from "pg-boss";

export type BossOptions = {
  schema?: string;
};

export function createBoss(options: BossOptions = {}) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for pg-boss.");
  }

  return new PgBoss({
    connectionString: databaseUrl,
    schema: options.schema ?? process.env.PG_BOSS_SCHEMA ?? "public",
    monitorStateIntervalMinutes: 5,
  });
}
