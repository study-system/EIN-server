import pool from '../loaders/mysqlLoader';

class UserRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(email) {
    const [rows] = await this.pool.execute('select email,nickname,phone,address,detail_address,role,push_agree,email_check,authuser_id  from user where email=?', [email]);
    return rows;
  }

  async update(email, password, nickname, phone, address, detailAddress, pushAgree) {
    const [rows] = await this.pool.execute('update user set password = ?, nickname = ?, phone = ?, address = ?, detail_address = ?, push_agree = ? where email = ?', [password, nickname, phone, address, detailAddress, pushAgree, email]);
    return rows;
  }

  async getSessionInfo(email) {
    const [rows] = await this.pool.execute('select id,email,password,role,email_check from user where email=?;', [email]);
    return rows[0];
  }

  getInsertUserSql() {
    return 'insert into user(email,password,nickname,address,detail_address,phone,push_agree,role,name,location_id,authuser_id) values(?,?,?,?,?,?,?,?,?,?,?)';
  }

  async signUp(email, password, nickname, address, detailAddress, phone, pushAgree, name, location) {
    const [rows] = await this.pool.execute(this.getInsertUserSql(), [email, password, nickname, address, detailAddress, phone, pushAgree, '일반', name, location, null]);
    return rows;
  }

  async authEmail(userId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async signUpAuthUser(email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website) {
    console.log(email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website);
    const conn = await this.pool.getConnection();
    await conn.query('insert into auth_user(company,company_number,position,website) values(?,?,?,?)', [company, companyNumber, position, website]);
    const authUserId = await conn.execute('SELECT LAST_INSERT_ID();');
    console.log(authUserId[0][0]['LAST_INSERT_ID()']);
    console.log(this.getInsertUserSql());
    console.log(email, password, nickname, address, detailAddress, phone, pushAgree, '인증', name, locationId, authUserId);
    console.log('asddas');
    await conn.execute(this.getInsertUserSql(), [email, password, nickname, address, detailAddress, phone, pushAgree, '인증', name, locationId, authUserId]);
    this.pool.releaseConnection(conn);
  }

  async authUser(userId) {
    const [rows] = await this.pool.execute('');
    return rows;
  }
}

export default new UserRepository(pool);
