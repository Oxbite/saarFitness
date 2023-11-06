import { decode } from 'src/lib/auth';
export default async function handler(req, res) {
  if (req.method != 'GET') {
    res.status(405).end()
  }
  const token  = req.cookies["saar-auth"]
  if (token) {
    try{
      const loggedin = decode(token);
      res.json(loggedin)
      return

    } catch (e){
      res.status(400).end();
      return;
    }
  } else {
    res.status(400).end();
  }
}
