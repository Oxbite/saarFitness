import { sign, verify } from "jsonwebtoken";

export const SECRET = "gymfitnesssaar"

export function createToken(data) {
  return sign({
    data: {...data,
      createdAt: new Date(),
    }
  },
    SECRET, {expiresIn: 60*60*1 }
  );
}

export function decode(token) {
  return verify(token, SECRET)
}
export function loggedIn(token){
  try {
      if(decode(token)){
      return true;
      }return false;
  } catch(e) {
    return false
  }
}
