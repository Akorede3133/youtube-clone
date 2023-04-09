import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context';
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard';
import './Videos.css'

const Videos = () => {
  const { videos, setVideos, text, setText } = useGlobalContext();
  const url = `https://youtube-v31.p.rapidapi.com/search?q=${text}&part=snippet&maxResults=50`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2006fcddebmshb8e2fb348e572f5p13c9acjsn19e6f039cdde',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const fetchData = async () => {
    const response = await fetch(url, options);
    const data = await response.json();
    setText('all');
    setVideos(data.items ? data.items : []);
  }
  useEffect(() => {
    fetchData();
  }, [])
  const videoElements = videos.map(item => {
    console.log(item);
    const channelId = item.id?.channelId
    const videoId = item.id?.videoId
    const {snippet} = item;
    if (item.id.channelId) {
      return <ChannelCard id={channelId} details={snippet}/>
    }
    return <VideoCard key={videoId} details={snippet} id={videoId} />
  })
  return (
    <section className='videos__container'>
      {videoElements}
    </section>
  )
}

export default Videos