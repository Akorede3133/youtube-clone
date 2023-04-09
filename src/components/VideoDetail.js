import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context';
import ReactPlayer from 'react-player';
import VideoCard from './VideoCard';
import './VideoDetail.css'

const VideoDetail = () => {
  const [video, setVideo] = useState([])
  const {videos, setVideos} = useGlobalContext();
  const { id } = useParams();
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2006fcddebmshb8e2fb348e572f5p13c9acjsn19e6f039cdde',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const relatedVidUrl = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50`;
  const url = `https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=${id}`;
  const fetchData = async () => {
    const response = await fetch(url, options);
    const data = await response.json();
    setVideo(data.items ? data.items : []);
  }
  const fetchRelatedData = async () => {
    const response = await fetch(relatedVidUrl, options);
    const data = await response.json();
    console.log(data);
    setVideos(data.items ? data.items : []);
  }
  useEffect(()=> {
    fetchData();
    fetchRelatedData();
  }, [id])
  const snippet = video[0]?.snippet;
  const videoElements = videos.map((item, index) => {
    const channelId = item.id?.channelId
    const videoId = item.id?.videoId
    const {snippet} = item;
    return <VideoCard key={index} details={snippet} id={videoId} />
  })
  return (
    <section className='videodetail__container'>
      <article className='videodetail__player'>
        <section className='player'>
        <ReactPlayer className='videodetail__react__player' width={`100%`} height={`100%`}
           url={`https:www.youtube.com/watch?v=${id}`} controls />
        </section>
          <article className='videodetail__title'>
            <h2>{snippet?.title}</h2>
        </article>
      </article>    
      <article className='videodetail__videos'>
        {videoElements}
      </article>
    </section>
  )
}

export default VideoDetail