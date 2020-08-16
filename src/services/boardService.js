import majorRepository from '../repositories/majorRepository';
import locationRepository from '../repositories/locationRepository';
import boardRepository from '../repositories/boardRepository';
import commentRepository from '../repositories/commentRepository';
import targetRepository from '../repositories/targetRepository';
import Page from '../utils/Page';

class BoardService {
  constructor(majorRepo, locationRepo, boardRepo, commentRepo, targetRepo) {
    this.majorRepository = majorRepo;
    this.locationRepository = locationRepo;
    this.boardRepository = boardRepo;
    this.commentRepository = commentRepo;
    this.targetRepository = targetRepo;
  }

  async listMajor() {
    const list = await this.majorRepository.list();
    return list;
  }

  async listLocation() {
    const list = await this.locationRepository.list();
    return list;
  }

  async listTarget() {
    const list = await this.targetRepository.list();
    return list;
  }

  async createBoard(userId, title, startDate, endDate, content, locationId, majorId, targetId, auth) {
    const result = await this.boardRepository.create(
      userId, title, startDate, endDate, content, locationId, majorId, targetId, auth,
    );
    return result;
  }

  async editBoard(boardId, title, startDate, endDate, content, locationId, majorId, targetId) {
    const result = await this.boardRepository.put(
      boardId, title, startDate, endDate, content, locationId, majorId, targetId,
    );
    return result;
  }

  async deleteBoard(boardId) {
    const result = await this.boardRepository.delete(boardId);
    return result;
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

  async listComment(boardId) {
    return {
      contents: await this.commentRepository.list(boardId),
    };
  }

  async createComment(boardId, userEmail, comment) {
    const result = await this.commentRepository.create(boardId, userEmail, comment);
    return result;
  }

  async putComment(commentId, comment) {
    const result = await this.commentRepository.put(commentId, comment);
    return result;
  }

  async deleteComment(commentId) {
    const result = await this.commentRepository.delete(commentId);
    return result;
  }
}

const boardService = new BoardService(
  majorRepository, locationRepository, boardRepository, commentRepository, targetRepository,
);
export default boardService;
