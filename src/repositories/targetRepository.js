import pool from '../loaders/mysqlLoader';

class TargetRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list() {
    const [rows] = await this.pool.query('select * from target');
    return rows;
  }
}

export default new TargetRepository(pool);
