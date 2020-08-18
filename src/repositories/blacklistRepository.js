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
    const [rows] = await this.pool.query('update blacklist set agree = ? where id= ? ', [status, blacklistId]);
    return rows;
  }

  async create(reporter, reportedUser, content) {
    const [rows] = await this.pool.query('insert into blacklist (user_email,blacklist_email,content) values (?,?,?);', [reporter, reportedUser, content]);
    return rows;
  }

  async size(status) {
    // const [rows] = await this.pool.query('');
    return 9999 || rows[0]['COUNT(*)'];
  }
}

export default new BlacklistRepository(pool);
