import mysql from 'mysql2/promise';
import config from '../config';
import majorRepository from '../repositories/majorRepository';

const pool = mysql.createPool(config.mysqlSetting);
majorRepository(pool);
