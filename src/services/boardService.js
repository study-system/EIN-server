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
    try {
      await this.boardRepository.create(
        userId, title, startDate, endDate, content, locationId, majorId, targetId, auth,
      );
    } catch (error) {
      return false;
    }
    return true;
  }

  async editBoard(boardId, title, startDate, endDate, content, locationId, majorId, targetId, imageUrl) {
    const result = await this.boardRepository.put(
      boardId, title, startDate, endDate, content, locationId, majorId, targetId, imageUrl,
    );
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  async deleteBoard(boardId) {
    const result = await this.boardRepository.delete(boardId);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  async verifyOwnBoard(boardId, userId) {
    const row = await this.boardRepository.getUserId(boardId);
    if (!!row && (row.user_id === userId)) {
      return true;
    }
    return false;
  }

  async listBoard(authFlag, location, major, target, pageSize = 10, page = 1) {
    return Page(
      await this.boardRepository.list(authFlag, location, major, target, page, pageSize),
      page,
      await this.boardRepository.size(authFlag, location, major, target),
      pageSize,
    );
  }

  async getBoard(boardId) {
    const data = await this.boardRepository.get(boardId);
    return data;
  }

  async listComment(boardId) {
    return {
      contents: await this.commentRepository.list(boardId),
    };
  }

  async createComment(boardId, userId, comment) {
    try {
      await this.commentRepository.create(boardId, userId, comment);
    } catch (error) {
      return false;
    }
    return true;
  }

  async verifyOwnComment(commentId, userId) {
    const row = await this.commentRepository.getUserId(commentId);
    if (!!row && (row.id === userId)) {
      return true;
    }
    return false;
  }

  async putComment(commentId, comment) {
    const result = await this.commentRepository.put(commentId, comment);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  async deleteComment(commentId) {
    const result = await this.commentRepository.delete(commentId);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
}

const boardService = new BoardService(
  majorRepository, locationRepository, boardRepository, commentRepository, targetRepository,
);
export default boardService;
