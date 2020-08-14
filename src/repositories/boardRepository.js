import pool from '../loaders/mysqlLoader';

class BoardRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(boardId) {
    const [rows] = await this.pool.query('select user.name as "writer",title,content,location.name as "location",start_date,end_date from board join user on board.id = user.id join location on location_id = location.id where board.id=?', [boardId]);
    return rows;
  }

  async list(authFlag, location, major, target, page = 1, pageSize = 10) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new BoardRepository(pool);
