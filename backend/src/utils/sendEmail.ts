
import { transporter } from "../config/mailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailOptions) => {
    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text
    })
};
