const Sib = require("sib-api-v3-sdk");
const cliente = Sib.ApiClient.instance;
const apiKey = cliente.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY_EMAIL;

const transEmailApi = new Sib.TransactionalEmailsApi();

const welcomeEmailRegister = async ({ email, name }) => {
  const sender = {
    email: "sdmoreno51@gmail.com",
  };
  await transEmailApi.sendTransacEmail({
    sender,
    to: email,
    subject: "Disney🌟",
    textContent: `
    <h1>Bienvenido a Disney</h1>
    <p>Hola ${name}, nos hace feliz tenerte con nosotros, esperamos que tengas una excelente experiencia 😄</p>
    `,
  });
};

module.exports = {
  welcomeEmailRegister,
};
