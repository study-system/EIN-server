import blacklistRepository from '../repositories/blacklistRepository';

class BlacklistService {
  constructor(blacklistRepo) {
    this.blacklistRepository = blacklistRepo;
  }

  async listblacklist(status, page, pageSize) {
    const list = await this.blacklistRepository.list(status, page, pageSize);
    return list;
  }

  async changeStatus(blacklistId, status) {
    const result = await this.blacklistRepository.put(blacklistId, status);
    return result;
  }

  async report(reporter, reportedUser, content) {
    const result = await this.blacklistRepository.create(reporter, reportedUser, content);
    return result;
  }
}

const blacklistService = new BlacklistService(blacklistRepository);
export default blacklistService;
