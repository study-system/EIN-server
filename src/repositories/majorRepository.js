class MajorRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async list() {
    const [rows] = await this.pool.query('SELECT * FROM major');
    return rows;
  }
}
let instance = null;

export default (pool) => {
  if (instance === null) { instance = new MajorRepository(pool); }
  return instance;
};
