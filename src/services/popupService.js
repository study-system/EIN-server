import popupRepository from '../repositories/popupRepository';

class PopupService {
  constructor(popupRepo) {
    this.popupRepository = popupRepo;
  }

  async get() {
    const list = await this.popupRepository.get();
    return list[0];
  }

  async changeImage(imageUrl) {
    const result = await this.popupRepository.changeImage(imageUrl);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }

  async changeActive(active) {
    const result = await this.popupRepository.changeActive(active);
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  }
}

const popupService = new PopupService(popupRepository);
export default popupService;
