import nodemailer from "nodemailer";
class MailService {
  setTransport() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    this.setTransport();
    await this.transporter.sendMail({
      from: `Pavel K <${process.env.SMTP_USER}>`,
      to,
      subject: `Activation account on ${process.env.API_URL}`,
      text: "",
      html: `
        <div>
          <h1>For activation account goto link</h1>
          <a href=${link}>${link}</a>
        </div>
      `,
    });
  }
}
export default new MailService();
