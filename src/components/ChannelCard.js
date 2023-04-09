import React from 'react'
import {Link} from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ChannelCard.css';
const ChannelCard = ({details, id}) => {
    const {description, title, thumbnails: {high: { url }}} = details;
  return (
    <article className='channelcard__container'>
    <Link to={`/channel/${id}`}>
        <section className='channelcard__img'>
            <img src={url} alt='img' />
        </section>
    </Link>
    <Link to={`/channel/${id}`}>
        <section className='channelcard__details'>
            <article className='channelcard__info'>
                <section className='channelcard__title__container'>
                <h3 className='channelcard__title'>
                    {title}
                </h3>
                <CheckCircleIcon className='channelcard__check' />
                </section>
                <p className='channelcard__desc'>
                    {description}
                </p>
            </article>
        </section>
    </Link>
</article>
  )
}

export default ChannelCard