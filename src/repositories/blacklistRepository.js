import pool from '../loaders/mysqlLoader';
import sqlSupporter from '../utils/sqlSupporter';

class BlacklistRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(status, page = '', pageSize = '') {
    const whSql = sqlSupporter.genericAndfilter({
      agree: status,
    });
    const limit = sqlSupporter.convertPageToLimit(page, pageSize);
    const [rows] = await this.pool.execute(`select * from blacklist ${whSql} order by blacklist.id desc LIMIT ?, ?`, limit);
    return rows;
  }

  async put(blacklistId = '', status = '') {
    const [rows] = await this.pool.execute('update blacklist set agree = ? where id= ? ', [status, blacklistId]);
    return rows;
  }

  async create(reporter = '', reportedUser = '', content = '') {
    const [rows] = await this.pool.execute('insert into blacklist (user_email,blacklist_email,content) values (?,?,?);', [reporter, reportedUser, content]);
    return rows;
  }

  async size(status) {
    const whSql = sqlSupporter.genericAndfilter({
      agree: status,
    });
    const [rows] = await this.pool.execute(`SELECT COUNT(*) FROM blacklist ${whSql}`);
    return rows[0]['COUNT(*)'];
  }
}

export default new BlacklistRepository(pool);
