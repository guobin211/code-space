import { NextApiHandler } from 'next'

export interface UserInfo {
  app_id: string
  user_id: string
  username: string
  email: string
}

export interface ApiResponse<T> {
  code: number
  data: T
  msg: string
}

//  生成token
const generateToken = (userInfo: UserInfo) => {
  return Buffer.from(`${userInfo.app_id}:${userInfo.user_id}`).toString('base64')
}

const handleRequest: NextApiHandler<ApiResponse<UserInfo>> = async (req, res) => {
  const userInfo: UserInfo = {
    app_id: 'app_id',
    user_id: 'user_id',
    username: 'michael',
    email: 'email',
  }
  const cookie = req.headers.cookie || ''
  if (!cookie.includes('token')) {
    const token = generateToken(userInfo)
    res.setHeader('Set-Cookie', `token=${token}; path=/; httpOnly; max-age=2592000`)
  }
  res.setHeader('Server', 'next-api').status(200).json({
    code: 0,
    data: userInfo,
    msg: 'success',
  })
}

export default handleRequest
