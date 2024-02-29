// import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function send(to, code, username) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Verification",
      // html: ReactDOMServer.renderToStaticMarkup(<EmailForm code={code} username={username} />),
      html: EmailForm({code, username})
    });
    return info
  } catch (error) {
    // throw new Error(error)
    console.error(error);
  }

}

const EmailForm = ({ code, username }) => {
  return (
    `<div>
      <h1 style="text-align: center;">Verify Your E-mail Address</h1>
      <h3>Hi, ${username}</h3>
      <p>You're almost ready to get started, Please copy the code below to verify your email address:</p>
      <div>
        <b style="display: block; text-align: center; margin: auto; width: max-content; padding: 5px 25px; background: #eee; border-radius: 5px; font-size: 15px;">${code}</b>
      </div>
    </div>`
  )
}

export default transporter;