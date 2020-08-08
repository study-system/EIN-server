import majorRepository from '../repositories/majorRepository';

class BoardService {
  constructor(majorRepo) {
    this.majorRepository = majorRepo();
  }

  async listMajor() {
    const list = await this.majorRepository.listMajor();
    return list;
  }
}

const boardService = new BoardService(majorRepository);
export default boardService;
