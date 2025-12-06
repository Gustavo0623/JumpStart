'use server'; // 👈 This marks all functions in this file as server-only

import mysql from 'mysql2/promise';

// Best practice: Cache the connection helper to avoid "Too Many Connections" in dev mode
let pool: mysql.Pool;

function getDbPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function checkJumperAvailability(eventDate: string, jumperName: string) {
  // 1. Input Validation
  if (!eventDate || !jumperName) {
    return { available: false, error: 'Missing date or jumper name' };
  }

  try {
    const db = getDbPool();

    // 2. Query the Database
    // We count how many bookings exist for this specific jumper on this specific date
    const [rows] = await db.execute<mysql.RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM bookings WHERE jumper_name = ? AND event_date = ?',
      [jumperName, eventDate]
    );

    const count = rows[0].count;

    // 3. Return simple data
    // If count is 0, it's available. If > 0, it's booked.
    const isAvailable = count === 0;

    return { 
      available: isAvailable, 
      message: isAvailable ? 'Available!' : 'Sorry, this jumper is booked for that date.' 
    };

  } catch (error) {
    console.error('Database Error:', error);
    return { available: false, error: 'Database connection failed' };
  }
}