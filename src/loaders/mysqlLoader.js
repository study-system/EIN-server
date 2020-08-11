import mysql from 'mysql2/promise';
import config from '../config';
import majorRepository from '../repositories/majorRepository';
import userRepository from '../repositories/userRepository';
import locationRepository from '../repositories/locationRepository';

const pool = mysql.createPool(config.mysqlSetting);
majorRepository(pool);
userRepository(pool);
locationRepository(pool);
