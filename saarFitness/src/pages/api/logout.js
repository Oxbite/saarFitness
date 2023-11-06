export default async function handler(req, res) {
  if (req.method != 'GET') {
    res.status(405).end()
  }
        console.log(req.body)
        res.setHeader('Set-Cookie', "saar-auth=noauth;Max-Age=3600; Path=/");
        res.json({status: 0})
        return
}
