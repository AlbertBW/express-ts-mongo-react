import "dotenv/config";

export default {
  port: 3000,
  dbUri: "mongodb://localhost:27017/rest-express-ts",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
