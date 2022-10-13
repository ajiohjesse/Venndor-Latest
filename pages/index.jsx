import Head from 'next/head'
import { useState } from 'react'
import Featured from '../components/Featured'
import RecentlyAdded from '../components/RecentlyAdded'

var __DEV__ = false

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
