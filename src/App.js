import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import VideoDetail from './components/VideoDetail';
import ChannelDetails from './components/ChannelDetails';
import Videos from './components/Videos';
import Header from './components/Header';
import SearchField from './components/SearchField';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetails />} />
        <Route path='/search/:searchKey' element={<SearchField />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
