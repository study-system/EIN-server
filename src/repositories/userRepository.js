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

  async getSessionInfo(email) {
    const [rows] = await this.pool.query('select * from user;');
    // return rows;
    return {
      id: '1', email: 'myks790@gmail.com', password: '$2b$13$q29Yjl9asfamcjCWYzhT9uR0MtBbi7zLQ9DwT8zqtyVfmS8BcxhVu', role: '인증',
    };
  }

  getInsertUserSql(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, authUserId) {
    return '';
  }

  async signUp(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location) {
    const [rows] = await this.pool.query(this.getInsertUserSql(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location));
    return rows;
  }

  async authEmail(userId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async signUpAuthUser(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website) {
    const conn = await this.pool.getConnection();
    await conn.query('insert into ');
    const authUserId = await conn.query('SELECT LAST_INSERT_ID();');
    console.log(authUserId[0][0]['LAST_INSERT_ID()']);
    await conn.query(this.getInsertUserSql(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, authUserId));
    this.pool.releaseConnection(conn);
  }

  async authUser(userId) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new UserRepository(pool);
