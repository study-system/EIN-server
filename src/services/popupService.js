import popupRepository from '../repositories/popupRepository';

class PopupService {
  constructor(popupRepo) {
    this.popupRepository = popupRepo;
  }

  async get() {
    const list = await this.popupRepository.get();
    return list;
  }

  async changeImage(imageUrl) {
    const result = await this.popupRepository.create(imageUrl);
    return result;
  }

  async changeActive(active) {
    const result = await this.popupRepository.put(active);
    return result;
  }
}

const popupService = new PopupService(popupRepository);
export default popupService;
