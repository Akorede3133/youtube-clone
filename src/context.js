import React, { useContext, useState } from 'react';
const globalContext = React.createContext();
const AppProvider = ({ children}) => {
    const [videos, setVideos] = useState([]);
    const [text, setText] = useState('All');
    return <globalContext.Provider value={{
        videos,
        setVideos,
        text,
        setText
    }}>
        {children}
    </globalContext.Provider>
}
const useGlobalContext = () => {
    return useContext(globalContext);   
}
export { useGlobalContext }
export default AppProvider;