import { JwtService } from '@nestjs/jwt';

export const Auth = async (jwt: JwtService, req) => {
  let token = req.headers['authorization'];
  token = token.split(' ')[1];

  const payload = await jwt.verifyAsync(token, {
    secret: process.env.JWT_SECRET_TOKEN,
  });
  console.log(payload);

  return payload.user;
};
