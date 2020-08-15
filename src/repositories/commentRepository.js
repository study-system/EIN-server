import pool from '../loaders/mysqlLoader';

class CommentRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list(boardId) {
    const [rows] = await this.pool.query('select * from comment');
    return rows;
  }

  async put(commentId, comment) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async create(boardId, userEmail, comment) {
    const [rows] = await this.pool.query('');
    return rows;
  }

  async delete(commentId) {
    const [rows] = await this.pool.query('');
    return rows;
  }
}

export default new CommentRepository(pool);