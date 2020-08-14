import pool from '../loaders/mysqlLoader';

class LocationRepository {
  constructor(dbPool) {
    this.pool = dbPool;
  }

  async list() {
    const [rows] = await this.pool.query('select * from location');
    return rows;
  }
}

export default new LocationRepository(pool);
