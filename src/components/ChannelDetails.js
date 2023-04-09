import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import ChannelCard from './ChannelCard';
import VideoCard from './VideoCard';
import './ChannelDetails.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ChannelDetails = () => {
  const [details, setDetails] = useState({})
  const [videos, setVideos]= useState([])
  const {id} = useParams();
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2006fcddebmshb8e2fb348e572f5p13c9acjsn19e6f039cdde',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const url = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${id}`;
  const videosUrl = `https://youtube-v31.p.rapidapi.com/search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`;
  const fetchDetails = async () => {
    const response = await fetch(url, options);
    const data = await response.json();
    setDetails(data.items[0]);
  }
  const fetchVideos = async () => {
    const response = await fetch(videosUrl, options);
    const data = await response.json();
    setVideos(data.items);
  }
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }
  useEffect(() => {
    fetchDetails();
    fetchVideos();
  }, [])
  console.log(details);
  const videoElements = videos.map((item, index) => {
    const channelId = item.id?.channelId
    const videoId = item.id?.videoId
    const {snippet} = item;
    return <VideoCard key={index} details={snippet} id={videoId} />
  })
  const {snippet, statistics} = details;
  //const {title} = snippet;
  console.log(snippet?.title);
  return (
    <section className='channeldetails__container'>
      <article className='channeldetails__banner'>
        <section className='channeldetails__img'>
          <img src={snippet?.thumbnails?.default?.url} alt={snippet?.title} />
        </section>
        <section className='channeldetails__details'>
            <article className='channeldetails__info'>
                <section className='channeldetails__title__container'>
                  <h3 className='channeldetails__title'>
                      {snippet?.title}
                  </h3>
                  <CheckCircleIcon className='channelcard__check' />
                </section>
                <p className='channeldetals__customUrl'>{snippet?.customUrl}</p>
                <p className='channeldetails__subscribers'>{statistics?.subscriberCount && kFormatter(Number(statistics?.subscriberCount))} subscribers</p>               
                <p className='channeldetails__subscribers'>{statistics?.videoCount && kFormatter(Number(statistics?.videoCount))} videos</p>               
                <p className='channelcard__desc'>
                    {snippet?.description}
                </p>
            </article>
        </section>
      </article>
      <article className='channeldetails__videos'>
        {videoElements}
      </article>
    </section>
  )
}

export default ChannelDetails