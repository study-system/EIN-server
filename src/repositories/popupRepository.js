import pool from '../loaders/mysqlLoader';

class PopupRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get() {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async put(imageUrl) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async create(active) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new PopupRepository(pool);
