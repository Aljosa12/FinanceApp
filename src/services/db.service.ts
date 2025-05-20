import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const DB_TRANSACTONS = '2kk';

export interface Transaction {
  id?: string,
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
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private transactions: WritableSignal<Transaction[]> = signal<Transaction[]>(
    []
  );
  private isDbReady = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  getTransactions() {
    return this.transactions;
  }

  async initializePlugin() {
    const isConn = await this.sqlite.isConnection(DB_TRANSACTONS, false);

    if (isConn.result) {
      this.db = await this.sqlite.retrieveConnection(DB_TRANSACTONS, false);
      // await this.sqlite.closeConnection(DB_TRANSACTONS, false);
    } else {
      this.db = await this.sqlite.createConnection(
        DB_TRANSACTONS,
        false,
        'no-encryption',
        1,
        false
      );
    }

    console.log('Connection: ', isConn);

    // if (isConn.result) {
    //   // Retrieve existing connection
    // } else {
    // Create a new connection
    // }

    await this.db.open();

    const schema = `
          CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY,
            type TEXT,
            amount NUMERIC,
            category NUMERIC,
            note TEXT,
            date TEXT
          );
        `;

    await this.db.execute(schema);
    this.loadTransactions();
  }

  async loadTransactions() {
    const transactions = await this.db.query('SELECT * FROM transactions;');

    this.transactions.set(transactions.values || []);
  }

  async addTransaction(transaction: Transaction) {
    const query = `INSERT INTO transactions (type, amount, category, note, date) VALUES (?, ?, ?, ?, ?)`;
    const result = await this.db.run(query, [
      transaction.type,
      transaction.category,
      transaction.amount,
      transaction.note,
      transaction.date,
    ]);

    this.loadTransactions();
    return result;
  }

  async getTransaction(id: string) {
    const result = await this.db.query(
      'SELECT * FROM transactions WHERE id = ?',
      [id]
    );

    let ab = result?.values?.[0];

    console.log('ab transaction', ab)

    return ab;
  }
}
