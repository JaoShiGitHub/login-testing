import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:000000@localhost:5432/login_testing",
});

export { pool };
