import multiparty from 'multiparty'
import fs from 'fs'
import path from 'path'
import { UUID, randomUUID } from 'crypto'

export default async function handle(req, res) {
  const form = new multiparty.Form()

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed' })
    }

    console.log(files)
    const { file } = files
    const uploadDirectory = path.resolve('./cdn/uploads/')
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true })
    }
    const links = []
    for (let i of file) {
      const ext = i.originalFilename.split('.').pop()
      const filename = randomUUID() + '.' + ext
      const filePath = path.join(uploadDirectory, filename)

      fs.writeFileSync(filePath, fs.readFileSync(i.path))
      links.push(`${filename}`)
    }

    return res.json({ links })
  })
}

export const config = {
  api: { bodyParser: false }
}
