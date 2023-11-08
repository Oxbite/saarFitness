import { createToken} from 'src/lib/auth';
export default async function handler(req, res) {
  if (req.method != 'POST') {
    res.status(405).end()
  }

    if(req.body.password == "123saar_456") {
        res.setHeader('Set-Cookie', "saar-auth="+createToken({})+";Max-Age=3600; Path=/");
        res.json({status: 0})
        return
    } else {
        res.json({status: -1})
        return

    }
}
