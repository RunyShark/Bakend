const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENTD_ID =
  "252263736230-sa7uubqje9svv532kd7dlgust640jqcb.apps.googleusercontent.com";
const CLIENTD_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRES_TOKEN =
  "1//04-8QenmHN4dZCgYIARAAGAQSNwF-L9Ir_-83PwFuEaQxWKlcMsb0fsSMHi8WSvlU9ONll0V33SV_TY2K3zF1ocBEzZnANrgOtmA";

const oAuth2Client = new google.auth.OAuth2(
  CLIENTD_ID,
  CLIENTD_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRES_TOKEN });

const welcomeEmailRegister = async (datos) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sdmoreno51@gmail.com",
        clientId: CLIENTD_ID,
        clientSecret: CLIENTD_SECRET,
        refreshToken: REFRES_TOKEN,
        accessToken: accessToken,
      },
    });

    const { email, nombre } = datos;

    const info = await transport.sendMail({
      from: "Disney🌟",
      to: email,
      subject: "Disney🌟",
      text: "Disney🌟",
      html: `
    <h1>Bienvenido a Disney</h1>
    <p>Hola ${nombre} nos hace feliz tenerte con nosotros, esperamos que tengas una excelente experiencia 😄</p>
    `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  welcomeEmailRegister,
};

// const Sib = require("sib-api-v3-sdk");
// const cliente = Sib.ApiClient.instance;
// const apiKey = cliente.authentications["api-key"];
// apiKey.apiKey =
//   "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";

// const transEmailApi = new Sib.TransactionalEmailsApi();

// const welcomeEmailRegister = async (email) => {
//   try {
//     console.log(email);
//     const sender = {
//       email: "sdmoreno51@gmail.com",
//     };

//     await transEmailApi.sendTransacEmail({
//       sender,
//       to: email,
//       subject:
//       textContent:
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   welcomeEmailRegister,
// };
