import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

interface Transaction {
  type: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

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
      const isConn = await this.sqlite.isConnection('db_finance', false);
      if (!isConn.result) {
        this.db = await this.sqlite.createConnection('db_finance', false, 'no-encryption', 1, false);
      } else {
        this.db = await this.sqlite.retrieveConnection('db_finance', false);
      }
  
      await this.db.open();
  
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY,
          type TEXT,
          amount NUMERIC,
          category NUMERIC,
          note TEXT,
          date TEXT
        );
      `);
  
      this.isDbReady = true;
    } catch (err) {
      console.error('DB init error', err);
    }
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    if (!this.db || !this.isDbReady) throw new Error('Database not ready');

    const query = 'INSERT INTO transactions (type, amount, category, note, date) VALUES (?, ?, ?, ?, ?)';
    const result = await this.db.run(query, [transaction.type, transaction.category, transaction.amount, transaction.note, transaction.date]);
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

  isDatabaseReady(): boolean {
    return this.isDbReady && this.db != null;
  }
}