import mysql from 'mysql2/promise'

// Configuration de la connexion MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '4000'), // TiDB default is 4000
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL === 'true' ? {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})

export async function query<T>(sql: string, params?: unknown[]): Promise<T> {
  const [results] = await pool.execute(sql, params)
  return results as T
}

export async function getConnection() {
  return pool.getConnection()
}

export default pool
