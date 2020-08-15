import majorRepository from '../repositories/majorRepository';
import locationRepository from '../repositories/locationRepository';
import boardRepository from '../repositories/boardRepository';
import Page from '../utils/Page';

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

  async listBoard(authFlag, location, major, target, pageSize = 10, page = 1) {
    return Page(
      await this.boardRepository.list(authFlag, location, major, target, page, pageSize),
      page,
      await this.boardRepository.size(authFlag),
    );
  }

  async getBoard(boardId) {
    const data = await this.boardRepository.get(boardId);
    return data[0];
  }
}

const boardService = new BoardService(majorRepository, locationRepository, boardRepository);
export default boardService;
