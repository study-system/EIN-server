import majorRepository from '../repositories/majorRepository';
import locationRepository from '../repositories/locationRepository';

class BoardService {
  constructor(majorRepo, locationRepo) {
    this.majorRepository = majorRepo();
    this.locationRepository = locationRepo();
  }

  async listMajor() {
    const list = await this.majorRepository.listMajor();
    return list;
  }

  async listLocation() {
    const list = await this.locationRepository.get();
    return list;
  }
}

const boardService = new BoardService(majorRepository, locationRepository);
export default boardService;
