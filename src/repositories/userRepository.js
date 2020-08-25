import pool from '../loaders/mysqlLoader';
import sqlSupporter from '../utils/sqlSupporter';

class UserRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(email = '') {
    const [rows] = await this.pool.execute('select email, name,nickname,phone,address,detail_address,role,push_agree,email_check,authuser_id  from user where email=?', [email]);
    return rows;
  }

  async update(email = '', password = '', nickname = '', phone = '', locationId, address = '', detailAddress = '', pushAgree = '') {
    const [rows] = await this.pool.execute('update user set password = ?, nickname = ?, phone = ?,location_id = ?, address = ?, detail_address = ?, push_agree = ? where email = ?', [password, nickname, phone, locationId, address, detailAddress, pushAgree, email]);
    return rows;
  }

  async put(authUserId, auth) {
    const [rows] = await this.pool.execute('update auth_user set auth = ? where id = ?', [auth, authUserId]);
    return rows;
  }

  async getSessionInfo(email = '') {
    const [rows] = await this.pool.execute('select id,email,password,role,email_check from user where email=?;', [email]);
    return rows[0];
  }

  async listAuthUser(auth, email_check, push_agree, location_id, page, pageSize) {
    const whSql = sqlSupporter.genericAndfilter({
      role: '인증', location_id, push_agree, email_check, auth,
    });
    const limit = sqlSupporter.convertPageToLimit(page, pageSize);
    const [rows] = await this.pool.execute(`SELECT user.id, authuser_id, name,nickname,email, address, detail_address, email_check, push_agree, phone, company, company_number,website, auth FROM user join auth_user on authuser_id = auth_user.id ${whSql} order by user.id desc LIMIT ?, ?`, limit);
    return rows;
  }

  getInsertUserSql() {
    return 'insert into user(email,password,nickname,address,detail_address,phone,push_agree,role,name,location_id,authuser_id) values(?,?,?,?,?,?,?,?,?,?,?)';
  }

  async signUp(email = '', password = '', nickname = '', address = '', detailAddress = '', phone = '', pushAgree = '', name = '', locationId = '') {
    const [rows] = await this.pool.execute(this.getInsertUserSql(), [email, password, nickname, address, detailAddress, phone, pushAgree, '일반', name, locationId, null]);
    return rows;
  }

  async authEmail(email = '') {
    const [rows] = await this.pool.query('UPDATE user SET email_check =? WHERE email = ?', ['yes', email]);
    return rows;
  }

  async signUpAuthUser(email = '', password = '', nickname = '', address = '', detailAddress = '', phone = '', pushAgree = '', name = '', locationId = '', company = '', companyNumber = '', position = '', website = '') {
    const conn = await this.pool.getConnection();
    await conn.execute('insert into auth_user(company,company_number,position,website) values(?,?,?,?)', [company, companyNumber, position, website]);
    const authUserId = (await conn.execute('SELECT LAST_INSERT_ID();'))[0][0]['LAST_INSERT_ID()'];
    await conn.execute(this.getInsertUserSql(), [email, password, nickname, address, detailAddress, phone, pushAgree, '인증', name, locationId, authUserId]);
    conn.release();
  }

  async authUser(userId = '') {
    const [rows] = await this.pool.execute('');
    return rows;
  }

  async size(role = '일반') {
    const [rows] = await this.pool.execute('SELECT COUNT(*) FROM user where role = ?;', [role]);
    return rows[0]['COUNT(*)'];
  }
}

export default new UserRepository(pool);
