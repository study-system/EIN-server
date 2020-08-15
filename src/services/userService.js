import userRepository from '../repositories/userRepository';

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
    await this.userRepository.getSaltAndPassword(email);
    // to do
    return false;
  }
}

const userService = new UserService(userRepository);
export default userService;
