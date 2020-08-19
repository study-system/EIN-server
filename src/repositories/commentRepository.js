import pool from '../loaders/mysqlLoader';

class CommentRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(boardId) {
    const [rows] = await this.pool.execute('SELECT comment.id,comment.content,board.user_id =comment.user_id as writerflag FROM board INNER JOIN comment ON board.id = study_db.comment.board_id where board_id = ?', [boardId]);
    return rows;
  }

  async put(commentId, comment) {
    const [rows] = await this.pool.execute('update comment set content = ? where id= ?', [comment, commentId]);
    return rows;
  }

  async create(boardId, userId, content) {
    const [rows] = await this.pool.execute('INSERT INTO study_db.comment(board_id,content, user_id) values(?,?,?)', [boardId, content, userId]);
    return rows;
  }

  async delete(commentId) {
    const [rows] = await this.pool.execute('delete from comment where id = ?', [commentId]);
    return rows;
  }
}

export default new CommentRepository(pool);
