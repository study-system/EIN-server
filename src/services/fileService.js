import admin from 'firebase-admin';
import { Duplex } from 'stream';
import serviceAccount from '../config/ein-server-firebase-adminsdk-key.json';

function bufferToStream(myBuuffer) {
  const tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ein-server.appspot.com',
});
class FileService {
  constructor() {
    this.bucket = admin.storage().bucket();
  }

  upload(des, file) {
    const filename = Date.now() + file.originalname;
    const fullPath = `${des}/${filename}`;
    const remoteWriteStream = this.bucket.file(fullPath).createWriteStream(
      {
        destination: fullPath,
        contentType: file.mimetype,
        predefinedAcl: 'publicRead',
      },
    );
    // await new Promise((resolve) =>
    //      bufferToStream(file.buffer).pipe(remoteWriteStream).on('finish', resolve)
    // );
    bufferToStream(file.buffer).pipe(remoteWriteStream);
    return { imgUrl: `https://storage.googleapis.com/ein-server.appspot.com/${fullPath}` };
  }
}

const fileService = new FileService();
export default fileService;
