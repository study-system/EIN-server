class BoardRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async get(boardId) {
    const [rows] = await this.pool.query('select user.name as "writer",title,content,location.name as "location",start_date,end_date from board join user on board.id = user.id join location on location_id = location.id where board.id=?', [boardId]);
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
