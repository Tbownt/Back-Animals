const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-f6gpyxxfyrkwuedi.us.auth0.com/.well-known/jwks.json", //?secret
  }),
  audience: "http://animales.com", //?solo permite token de aca
  issuer: "https://dev-f6gpyxxfyrkwuedi.us.auth0.com/",
  algorithms: ["RS256"],
});

export default checkJwt;
