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
    const [rows] = await this.pool.query('select id,email,password,role from user where email=?;', [email]);
    return rows[0];
  }

  getInsertUserSql() {
    return 'insert into user(email,password,nickname,address,detail_address,phone,push_agree,role,name,location_id,authuser_id) values(?,?,?,?,?,?,?,?,?,?,?)';
  }

  async signUp(email, password, nickname, address, detailAddress, phone, pushAgree, role, name, location) {
    const [rows] = await this.pool.query(this.getInsertUserSql(), [email, password, nickname, address, detailAddress, phone, pushAgree, role, name, location, null]);
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
    await conn.query(this.getInsertUserSql());
    this.pool.releaseConnection(conn);
  }

  async authUser(userId) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new UserRepository(pool);
