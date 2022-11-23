import Head from 'next/head'
import { useState } from 'react'
import Featured from '../components/Featured'
import RecentlyAdded from '../components/RecentlyAdded'

export default function Home() {
  return (
    <>
      <Head>
        <title>Venndor - The Online Marketplace</title>
      </Head>

      <Featured />
      <RecentlyAdded />
    </>
  )
}
