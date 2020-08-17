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
      await this.blacklistRepository.size(status),
      pageSize,
    );
  }

  async changeStatus(blacklistId, status) {
    const result = await this.blacklistRepository.put(blacklistId, status);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  async report(reporter, reportedUser, content) {
    try {
      await this.blacklistRepository.create(reporter, reportedUser, content);
    } catch (error) {
      return false;
    }
    return true;
  }
}

const blacklistService = new BlacklistService(blacklistRepository);
export default blacklistService;
