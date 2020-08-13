import majorRepository from '../repositories/majorRepository';
import locationRepository from '../repositories/locationRepository';
import boardRerpsitory from '../repositories/boardRepository';

class BoardService {
  constructor(majorRepo, locationRepo) {
    this.majorRepository = majorRepo();
    this.locationRepository = locationRepo();
  }

  async listMajor() {
    const list = await this.majorRepository.list();
    return list;
  }

  async listLocation() {
    const list = await this.locationRepository.list();
    return list;
  }

  async listBoard(authFlag, location, major, target, pageSize, page) {
    return boardRerpsitory.listBoard(authFlag, location, major, target, pageSize, page);
  }

  async getBoard(boardId) {
    return boardRerpsitory.getBoard(boardId);
  }
}

const boardService = new BoardService(majorRepository, locationRepository);
export default boardService;
