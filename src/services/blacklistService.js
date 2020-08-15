import blacklistRepository from '../repositories/blacklistRepository';
import Page from '../utils/Page';

class BlacklistService {
  constructor(blacklistRepo) {
    this.blacklistRepository = blacklistRepo;
  }

  async listblacklist(status, page = 1, pageSize = 10) {
    return Page(
      await this.blacklistRepository.list(status, page, pageSize),
      page,
      await this.blacklistRepository.size(),
    );
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
