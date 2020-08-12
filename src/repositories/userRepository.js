class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async get(email) {
    const [rows] = await this.pool.query('select * from user where email=?', [email]);
    return rows;
  }

  async update(password, nickname, phone, address, detailAddress) {
    return null;
  }
}
let instance = null;

export default (pool) => {
  if (instance === null) { instance = new UserRepository(pool); }
  return instance;
};
