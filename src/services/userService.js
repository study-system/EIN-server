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
    await this.userRepository.update(email, password, nickname, phone, address, detailAddress);
  }

  async verify(email, password) {
    try {
      const hash = await this.userRepository.getPassword(email);
      const match = await bcrypt.compare(`${password}`, hash);
      if (match) { return true; }
    } catch (error) {
      return false;
    }
    return false;
  }

  async signUp(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location) {
    const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
    await this.userRepository.signUp(email, hashedPw, nickname, adress, detailAddress, phone, pushAgree, role, name, location);
  }

  async signUpAuthUser(email, password, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website) {
    const hashedPw = await bcrypt.hash(`${password}`, saltRounds);
    await this.userRepository.signUpAuthUser(email, hashedPw, nickname, adress, detailAddress, phone, pushAgree, role, name, location, company, companyNumber, position, website);
  }
}

const userService = new UserService(userRepository);
export default userService;
