import pool from '../loaders/mysqlLoader';

class MajorRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list() {
    const [rows] = await this.pool.execute('SELECT * FROM major');
    return rows;
  }
}

export default new MajorRepository(pool);
