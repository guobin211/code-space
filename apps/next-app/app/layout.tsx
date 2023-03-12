import AppHeader from '@components/AppHeader'
import React from 'react'
import '../styles/globals.scss'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const state = AppHeader.getServerState()
  console.log('RootLayout.AppHeader.state', state)

  return (
    <html>
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <div className='app-layout'>
          <AppHeader></AppHeader>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
