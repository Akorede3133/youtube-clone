import React, { useRef, useState, useEffect } from 'react';
import './ScrollBar.css'
import category from '../utils/category';
import { useGlobalContext } from '../context';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ScrollBar = () => {
    const { videos, setVideos, text, setText } = useGlobalContext();
    const containerRef = useRef('');
    const leftArrowRef = useRef('');
    const rightArrowRef = useRef('');
    const [categories, setCategories] = useState(category);
    const [movement, setMovement] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const handleMouseMove = (e) => {
        if (!isDragging) {
            return;
        }
        setMovement(e.movementX);
        containerRef.current.scrollLeft -= movement;
        containerRef.current.classList.add('dragging');
        checkForIconDisplay();
    }
    const handleMouseDown = () => {
        setIsDragging(true);
    }
    const handleMouseUp =() => {
        setIsDragging(false);
        containerRef.current.classList.remove('dragging');
    }
    const checkForIconDisplay = () => {
        const scrollLeft = Math.floor(containerRef.current.scrollLeft);
        const scrollable = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        leftArrowRef.current.style.display = scrollLeft > 0 ? 'flex' : 'none';
        rightArrowRef.current.style.display = scrollable > scrollLeft ? 'flex' : 'none';
    }
    const handleNavigateRight = () => {
        containerRef.current.scrollLeft += 350;
        setTimeout(() => checkForIconDisplay(), 50)
      
    }
    const handleNavigateLeft = () => {
        setTimeout(() => checkForIconDisplay(), 50)
        containerRef.current.scrollLeft -= 350;
    }
    const url = `https://youtube-v31.p.rapidapi.com/search?q=${text}&part=snippet&maxResults=50`;
    const handleActive = (id) => {
        const newCategory = categories.map(item => {
            if (item.id === id) {
                item.active = true;
                setText(item.name);
            } else {
                item.active = false;
            }
            return item;
        })
        setCategories(newCategory);
    }
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2006fcddebmshb8e2fb348e572f5p13c9acjsn19e6f039cdde',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    useEffect(() => {
        fetchData();
    }, [text])
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setVideos(data.items);
    }
  return (
    <section  className='scrollbar__container'>
        <article className='icon'  ref={leftArrowRef}>
             <KeyboardArrowLeftIcon onClick={handleNavigateLeft} className='scrollbar__left arrow'/>
        </article>
        <ul ref={containerRef}  
            className='scrollbar__categories'  
            onMouseMove={handleMouseMove} 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {categories.map(item => {
                const { name, id, active } = item;
                return <li key={id} onClick={()=> handleActive(id)} className={active ? 'active' : ''}>{name}</li>
            })}
        </ul>
        <article className='icon'  ref={rightArrowRef}>
            <KeyboardArrowRightIcon onClick={handleNavigateRight} className=' scrollbar__right arrow' />
        </article>
    </section>
  )
}

export default ScrollBar