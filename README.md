
# 💬 app‑fdback

API para aplicação de feedbacks em tempo real, construída com Node.js, TypeScript, Express e MongoDB.

---

## 🚀 Tecnologias utilizadas

- **Node.js** (v22.10.0)
- **TypeScript** com execução via `--experimental-strip-types`
- **Express**
- **MongoDB** via Mongoose
- Autenticação: **jsonwebtoken**, **bcrypt**
- Segurança: **helmet**, **cors**, **express-rate-limit**
- Integrações: AWS S3, Google reCAPTCHA, WebSocket
- Variáveis de ambiente com **dotenv**

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/RomuloBreno/app-fdback.git
   cd app-fdback

2. Variáveis de ambiente
PORT=3000
MONGO_URI=mongodb://user:password@localhost:27017/dbname
PORT="5000"
PORT_WEB_SOCKET="5001"
FRONT_END=""
FRONT_END_WS=""
BACK_END=""
S3_KEY_ID=""
S3_SECRET=""
S3_REGION=""
S3_BUCKET_NAME=""
JWT_SECRET=""
JWT_EXPIRATION=""
BCRYPT_SALT_ROUNDS=""