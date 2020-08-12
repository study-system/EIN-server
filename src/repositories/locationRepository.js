class LocationRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async get() {
    const [rows] = await this.pool.query('select * from location');
    return rows;
  }
}
let instance = null;

export default (pool) => {
  if (instance === null) { instance = new LocationRepository(pool); }
  return instance;
};
