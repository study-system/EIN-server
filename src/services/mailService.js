import nodemailer from 'nodemailer';
import config from '../config';

class MailService {
  constructor() {
    this.init();
  }

  async init() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  async sendCheckEmail(email, authKey) {
    const host = config.emailAuthHost;
    const info = await this.transporter.sendMail({
      from: '"교육정보알리미" <admin@equalda.com>', // sender address
      to: `${email}`, // list of receivers
      subject: '교육 정보 알리미 이메일 인증 메일',
      html: `
      안녕하세요! <br/>
      교육정보 알리미 이메일 인증 메일입니다.  <br/>
      본인이 맞다면 아래 인증 링크를 눌러주세요. <br/>
      <a target="_blank" href="${host}${authKey}"  >이메일 인증</a>`,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log('Preview URL: %s', previewUrl);
    return previewUrl;
  }
}

const mailService = new MailService();
export default mailService;
