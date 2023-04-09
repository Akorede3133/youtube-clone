import React from 'react'
import Videos from './Videos';
import ScrollBar from './ScrollBar';
import './Home.css';
const Home = () => {
  return (
    <main>
        <ScrollBar />
        <Videos />
    </main>
  )
}

export default Home