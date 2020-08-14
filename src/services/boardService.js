import majorRepository from '../repositories/majorRepository';
import locationRepository from '../repositories/locationRepository';
import boardRepository from '../repositories/boardRepository';

class BoardService {
  constructor(majorRepo, locationRepo, boardRepo) {
    this.majorRepository = majorRepo;
    this.locationRepository = locationRepo;
    this.boardRepository = boardRepo;
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
    const list = await this.boardRepository.list(authFlag, location, major, target, page, pageSize);
    return list;
  }

  async getBoard(boardId) {
    const data = await this.boardRepository.get(boardId);
    return data[0];
  }
}

const boardService = new BoardService(majorRepository, locationRepository, boardRepository);
export default boardService;
