import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository';
import authService from './authService';
import Page from '../utils/Page';

const saltRounds = 12;

class UserService {
  constructor(userRepo) {
    this.userRepository = userRepo;
  }

  async listAuthUser(auth, email_check, push_agree, location_id, page = 1, pageSize = 10) {
    return Page(
      await this.userRepository.listAuthUser(auth, email_check, push_agree, location_id, page, pageSize),
      page,
      await this.userRepository.size('인증'),
      pageSize,
    );
  }

  async get(email) {
    const result = await this.userRepository.get(email);
    return result[0];
  }

  async update(email, password, nickname, phone, address, detailAddress, pushAgree) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.update(email, hashedPw, nickname, phone, address, detailAddress, pushAgree);
    } catch (error) {
      return false;
    }
    return true;
  }

  async auth(authUserId, auth) {
    try {
      await this.userRepository.put(authUserId, auth);
    } catch (error) {
      return false;
    }
    return true;
  }

  async verify(email, password) {
    try {
      const sessionInfo = await this.userRepository.getSessionInfo(email);
      const match = await bcrypt.compare(`${password}`, sessionInfo.password);
      if (match) { return sessionInfo; }
    } catch (error) {
      return null;
    }
    return null;
  }

  async signUp(email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.signUp(email, hashedPw, nickname, address, detailAddress, phone, pushAgree, name, locationId);
    } catch (error) {
      return false;
    }
    authService.sendAuthEmail(email);
    return true;
  }

  async signUpAuthUser(email, password, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.signUpAuthUser(email, hashedPw, nickname, address, detailAddress, phone, pushAgree, name, locationId, company, companyNumber, position, website);
    } catch (error) {
      return false;
    }
    authService.sendAuthEmail(email);
    return true;
  }
}

const userService = new UserService(userRepository);
export default userService;
