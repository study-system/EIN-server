import pool from '../loaders/mysqlLoader';

class PopupRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async get() {
    const [rows] = await this.pool.execute('select * from popup');
    return rows;
  }

  async changeActive(active) {
    const [rows] = await this.pool.execute('update popup set active = ? where id = 1', [active]);
    return rows;
  }

  async changeImage(imageUrl) {
    const [rows] = await this.pool.execute('update popup set image = ? where id = 1', [imageUrl]);
    return rows;
  }
}

export default new PopupRepository(pool);
