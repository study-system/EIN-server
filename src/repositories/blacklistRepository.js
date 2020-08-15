import pool from '../loaders/mysqlLoader';

class BlacklistRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(status, page, pageSize) {
    const [rows] = await this.pool.query('select * from blacklist');
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

  async size(auth) {
    // const [rows] = await this.pool.query('');
    return 1;
  }
}

export default new BlacklistRepository(pool);
