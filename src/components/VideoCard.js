import React from 'react'
import img from './smiley.png'
import './VideoCard.css'
import { Link } from 'react-router-dom'
const VideoCard = ({ details, id }) => {
    const {channelId, channelTitle, title, thumbnails: {high: { url }}} = details;
  return (
    <article className='videocard__container'>
        <Link to={`/video/${id}`}>
            <section className='videocard__img'>
                <img src={url} alt='img' />
            </section>
        </Link>
        <Link to={`/video/${id}`}>
            <section className='videocard__details'>
                <article className='videocard__mini__image'>
                    <img src={url} alt='ing' />
                </article>
                <article className='videocard__info'>
                    <h3 className='videocard__title'>
                       {title}
                    </h3>
                    <p className='videocard__channel'>
                        {channelTitle}
                    </p>
                    {/*<p className='videocard__views__info'>
                        <span className='videocard__views'>203k views</span>
                        <span className='videocard__dot'>.</span>
                        <span className='videocard__date'>1 month ago</span>
                    </p>*/}
                </article>
            </section>
        </Link>
    </article>
  )
}

export default VideoCard