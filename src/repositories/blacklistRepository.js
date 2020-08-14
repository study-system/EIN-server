import pool from '../loaders/mysqlLoader';

class BlacklistRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(status, page = 1, pageSize = 10) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async put(blacklistId, status) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async create(reporter, reportedUser, content) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new BlacklistRepository(pool);
