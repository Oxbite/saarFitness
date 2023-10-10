import multiparty from 'multiparty'
import fs from 'fs'
import mime from 'mime-types'
import { mongooseConnect } from '@/lib/mongoose'
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]'
const bucketName = 'dawid-next-ecommerce'
import axios from 'axios'
import FormData from 'form-data'
export default async function handle(req, res) {
  await mongooseConnect()
  await isAdminRequest(req, res)

  const form = new multiparty.Form()
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
  console.log('length:', files.file.length)
  console.log(files.file)

  const { file } = files
  const links = []
  for (let i of file) {
    const ext = i.originalFilename.split('.').pop()
    const filename = Date.now() + '.' + ext
  }
  console.log(links)
  return res.json({ links })
}

export const config = {
  api: { bodyParser: false }
}
