import pool from '../loaders/mysqlLoader';

class UserRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(email) {
    const [rows] = await this.pool.query('select * from user where email=?', [email]);
    return rows;
  }

  async update(password, nickname, phone, address, detailAddress) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new UserRepository(pool);
