import pool from '../loaders/mysqlLoader';

class CommentRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(boardId) {
    const [rows] = await this.pool.query('select * from comment where board_id = ?', [boardId]);
    return rows;
  }

  async put(commentId, comment) {
    const [rows] = await this.pool.query('update comment set content = ? where id= ?', [comment, commentId]);
    return rows;
  }

  async create(boardId, userEmail, comment) {
    const [rows] = await this.pool.query('INSERT INTO study_db.comment(board_id,comment, user_email) values(?,?,?)', [boardId, comment, userEmail]);
    return rows;
  }

  async delete(commentId) {
    const [rows] = await this.pool.query('delete from comment where board_id = ?', [commentId]);
    return rows;
  }
}

export default new CommentRepository(pool);
