import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isDbReady = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    try {
      const db = await this.sqlite.createConnection('my_db', false, 'no-encryption', 1, false);
      await db.open();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY,
          name TEXT,
          note TEXT
        );
      `);
      this.db = db;
      this.isDbReady = true;
    } catch (err) {
      console.error('DB init error', err);
    }
  }

  async addTransaction(name: string, note: string): Promise<void> {
    if (!this.db || !this.isDbReady) throw new Error('Database not ready');

    const query = 'INSERT INTO transactions (name, note) VALUES (?, ?)';
    const result = await this.db.run(query, [name, note]);
    console.log('Insert result:', result);
  }

  async getTransactions(): Promise<any[]> {
    if (!this.db || !this.isDbReady) throw new Error('Database not ready');

    const res = await this.db.query('SELECT * FROM transactions');
    return res.values ?? [];
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection('my_db', false);
      this.db = null;
      this.isDbReady = false;
    }
  }
}