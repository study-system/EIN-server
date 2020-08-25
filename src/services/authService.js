import { v4 as uuidv4 } from 'uuid';
import redis from 'redis';
import userRepository from '../repositories/userRepository';
import mailService from './mailService';
import config from '../config';

class AuthService {
  constructor(userRepo, _mailService) {
    this.redisClient = redis.createClient(config.redis);
    this.userRepository = userRepository;
    this.mailService = _mailService;
  }

  async sendAuthEmail(email) {
    const authKey = uuidv4();
    this.redisClient.set(authKey, email);
    const previewUrl = await this.mailService.sendCheckEmail(email, authKey);
    this.redisClient.lpush('standbyEmailAuth', previewUrl);
  }

  getStandbyEmailAuth(callback) {
    this.redisClient.lrange('standbyEmailAuth', 0, 10, callback);
  }

  authEmail(authKey, callback) {
    this.redisClient.get(authKey, async (error, reply) => {
      if (reply != null) {
        const result = await this.userRepository.authEmail(reply);
        if (result.affectedRows !== 0) {
          this.redisClient.del(authKey);
          callback(true);
        } else {
          callback(false);
        }
      } else {
        callback(false);
      }
    });
  }
}

const authService = new AuthService(userRepository, mailService);
export default authService;
