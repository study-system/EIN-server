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
    this.mailService.sendChekEmail(email, authKey);
  }

  authEmail(authKey) {
    this.redisClient.get(authKey, (error, reply) => {
      if (reply != null) {
        const result = this.userRepository.authEmail(reply);
        if (result.affectedRows !== 0) {
          this.redisClient.del(authKey);
        }
      }
    });
  }
}

const authService = new AuthService(userRepository, mailService);
export default authService;
