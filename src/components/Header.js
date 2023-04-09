import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../context';
import './Header.css'
const Header = () => {
  const [text, setText] = useState('');
  const navigate= useNavigate();
  const { videos, setVideos } = useGlobalContext();
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
    setVideos(data.items ? data.items : []);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${text}`);
    fetchData();
  }
  return (
    <header>
      <Link to='/'>
        <YouTubeIcon className='header__icon'/>
      </Link>
      <form onSubmit={handleSubmit} className='header__search'>
        <input type='text' name='search' value={text} onChange={(e)=> setText(e.target.value)}/>
        <p className='header__seach__container'>
          <SearchIcon className='header__search__icon'/>
        </p>
      </form>

    </header>
  )
}

export default Header;