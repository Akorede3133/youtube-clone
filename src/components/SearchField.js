import React from 'react'
import Videos from './Videos'
import { useGlobalContext } from '../context'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import './SearchField.css'
const SearchField = () => {
    const {videos} = useGlobalContext();
    const videoElements = videos.map((item, index) => {
        const channelId = item.id?.channelId
        const videoId = item.id?.videoId
        const {snippet} = item;
        if (item.id.channelId) {
          return <ChannelCard key={channelId} id={channelId} details={snippet}/>
        }
        return <VideoCard key={videoId} details={snippet} id={videoId} />
    })
  return (
 
    <section className='searchfield__container'>
        {videoElements}
    </section>
  )
}

export default SearchField