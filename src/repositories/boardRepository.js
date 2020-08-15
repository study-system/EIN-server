import pool from '../loaders/mysqlLoader';
import sqlSupporter from '../utils/sqlSupporter';

class BoardRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(boardId) {
    const [rows] = await this.pool.query('select user.name as "writer",title,content,location.name as "location",start_date,end_date from board join user on board.id = user.id join location on location_id = location.id where board.id=?', [boardId]);
    return rows;
  }

  async list(auth, location, major, target, page, pageSize) {
    // const wh = sqlSupporter.genericAndfilter({
    //   location_id: location, major_id: major, target_id: target,
    // });
    // console.log(wh);
    // const limit = sqlSupporter.convertPageToLimit(page, pageSize)
    // console.log(limit)
    const [rows] = await this.pool.query('select * from board');
    return rows;
  }

  async create(userId, title, startDate, endDate, content, locationId, majorId, targetId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async put(boardId, title, startDate, endDate, content, locationId, majorId, targetId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async delete(boardId) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async size(auth) {
    // const [rows] = await this.pool.query('');
    return 1;
  }
}

export default new BoardRepository(pool);
