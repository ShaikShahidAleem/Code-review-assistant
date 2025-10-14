import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'code_reviews.db');

// Create database connection
async function getDb() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        feedback TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Initialize database
async function initDatabase() {
  try {
    const db = await getDb();
    await db.close();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Save review to database
async function saveReview(reviewData) {
  const db = await getDb();
  try {
    const { code, feedback } = reviewData;
    const result = await db.run(
      'INSERT INTO reviews (code, feedback) VALUES (?, ?)',
      [code, feedback]
    );
    return result.lastID;
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  } finally {
    await db.close().catch(console.error);
  }
}

// Get a single review by ID
async function getReview(id) {
  const db = await getDb();
  try {
    return await db.get('SELECT * FROM reviews WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error getting review:', error);
    throw error;
  } finally {
    await db.close().catch(console.error);
  }
}

// Get all reviews
async function getAllReviews() {
  const db = await getDb();
  try {
    return await db.all('SELECT * FROM reviews ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error getting all reviews:', error);
    throw error;
  } finally {
    await db.close().catch(console.error);
  }
}

export {
  initDatabase,
  saveReview,
  getReview,
  getAllReviews,
  getDb
};
