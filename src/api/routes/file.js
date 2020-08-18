import express from 'express';
import multer from 'multer';
import fileService from '../../services/fileService';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const route = express.Router();

export default (router) => {
  router.use('/file', route);

  route.post('/', upload.single('file'), async (req, res) => {
    const data = await fileService.upload('images', req.file);
    res.json(data);
  });
};
