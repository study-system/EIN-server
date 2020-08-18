import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository';

const saltRounds = 13;

class UserService {
  constructor(userRepo) {
    this.userRepository = userRepo;
  }

  async get(email) {
    const result = await this.userRepository.get(email);
    return result[0];
  }

  async update(email, password, nickname, phone, address, detailAddress) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.update(email, hashedPw, nickname, phone, address, detailAddress);
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

  async signUp(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.signUp(email, hashedPw, nickname, adress, detailAddress, phone, pushAgree, role, name, location);
    } catch (error) {
      return false;
    }
    return true;
  }

  async signUpAuthUser(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website) {
    try {
      const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
      await this.userRepository.signUpAuthUser(email, hashedPw, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website);
    } catch (error) {
      return false;
    }
    return true;
  }
}

const userService = new UserService(userRepository);
export default userService;
