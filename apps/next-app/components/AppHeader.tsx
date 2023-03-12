import Link from 'next/link'
import React from 'react'
import { headers } from 'next/headers'

async function fetchUserInfo() {
  const header = headers()
  const host = header.get('host')

  const resp = await fetch(`http://${host}/api/refresh`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return {
        code: res.status,
        msg: res.statusText,
      }
    })
    .catch((err) => {
      console.log('fetchUserInfo.err', err)
      return {}
    })

  if (resp.code === 0) {
    return resp.data
  }
  return {}
}

declare const global: {
  __AppHeader__: object
}

const setServerState = (value: object) => {
  global.__AppHeader__ = value
}

const getServerState = () => {
  return global.__AppHeader__ || {}
}

const AppHeader: SFC = (async () => {
  const userInfo = await fetchUserInfo()
  setServerState(userInfo)

  return (
    <header>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/user'}>User</Link>
        </li>
        <li>
          <Link href={'/blog'}>Blog</Link>
        </li>
      </ul>
      <span>{userInfo.username}</span>
    </header>
  )
}) as unknown as SFC

AppHeader.displayName = 'AppHeader'
AppHeader.getServerState = getServerState

export type SFC<P = object, S = object> = React.FC<P> & {
  getServerState: () => Partial<S>
}

export default AppHeader
