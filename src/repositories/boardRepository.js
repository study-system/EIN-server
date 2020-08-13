class BoardRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async get(boardId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async list(authFlag, location, major, target, pageSize, page) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}
let instance = null;

export default (pool) => {
  if (instance === null) { instance = new BoardRepository(pool); }
  return instance;
};
