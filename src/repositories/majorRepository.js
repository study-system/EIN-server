import pool from '../loaders/mysqlLoader';

class MajorRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list() {
    const [rows] = await this.pool.query('SELECT * FROM major');
    return rows;
  }
}

export default new MajorRepository(pool);
