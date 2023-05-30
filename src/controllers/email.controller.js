import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    type: process.env.TYPE_AUTH,
    user: process.env.USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export const sendEmail = async (req, res) => {
  const payload = req.body;
  const destinationEmail = payload.email;
  const bodyEmail = {
    from: "<pavas0921@gmail.com",
    to: destinationEmail,
    subject: "Notificación de inicio de sesión",
    html: `<p>Se ha iniciado sesión en su cuenta de AppVet con el correo ${destinationEmail} </p>`,
  };

  try {
    let info = await transporter.sendMail(bodyEmail);
    console.log(payload.payload);
    res.send(payload.payload);
  } catch (error) {
    console.log(error);
    res.status.send(500);
  }
};
