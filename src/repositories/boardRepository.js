import pool from '../loaders/mysqlLoader';
import sqlSupporter from '../utils/sqlSupporter';

class BoardRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get(boardId = '') {
    const [rows] = await this.pool.execute('select board.id,title,content,board.location_id,major_id,target_id,user.nickname, user.email ,location.name as "location",start_date,end_date, imageurl, board.auth from board join user on board.user_id = user.id join location on board.location_id = location.id where board.id=?', [boardId]);
    return rows;
  }

  async getUserId(boardId) {
    const [row] = await this.pool.execute('SELECT user_id FROM board WHERE id = ?', [boardId]);
    return row[0];
  }

  async list(auth, location, major, target, page, pageSize) {
    const whSql = sqlSupporter.genericAndfilter({
      auth, 'board.location_id': location, major_id: major, target_id: target, block: 'no',
    });
    const limit = sqlSupporter.convertPageToLimit(page, pageSize);
    const [rows] = await this.pool.execute(`SELECT board.id,title,views,nickname, count(good.id) as likes FROM board join user on user_id = user.id left join good on board.id = good.board_id ${whSql} group by board.id order by board.id desc LIMIT ?, ?`, limit);
    return rows;
  }

  async create(userId = '', title = '', startDate = '', endDate = '', content = '', locationId = '', majorId = '', targetId = '', auth = '', imageurl = '') {
    const [rows] = await this.pool.execute('INSERT INTO study_db.board(user_id,title,start_date,end_date,content,location_id,major_id,target_id,auth,imageurl) values(?,?,STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.%fZ"),STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.%fZ"),?,?,?,?,?,?)', [userId, title, startDate, endDate, content, locationId, majorId, targetId, auth, imageurl]);
    return rows;
  }

  async put(boardId = '', title = '', startDate = '', endDate = '', content = '', locationId = '', majorId = '', targetId = '', imageUrl = '') {
    const [rows] = await this.pool.execute('update board set title = ?, start_date = STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.%fZ"), end_date = STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.%fZ"), content = ?, location_id = ?, major_id = ?, target_id = ?, imageurl = ? where id =?', [title, startDate, endDate, content, locationId, majorId, targetId, imageUrl, boardId]);
    return rows;
  }

  async delete(boardId = '') {
    const [rows] = await this.pool.execute('DELETE FROM board WHERE id =?', [boardId]);
    return rows;
  }

  async size(auth = '', location, major, target) {
    const whSql = sqlSupporter.genericAndfilter({
      auth, block: 'no', 'board.location_id': location, major_id: major, target_id: target,
    });
    const [rows] = await this.pool.execute(`SELECT COUNT(*) FROM board JOIN user ON board.user_id = user.id ${whSql}`);
    return rows[0]['COUNT(*)'];
  }
}

export default new BoardRepository(pool);
