import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import MobileChat from "./MobileChat";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isclick, setclick] = useState(false);

  useEffect(() => {
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, []);
  const checkWindowWidth = () => {
    const isMobile = window.innerWidth <= 768; // Adjust the width threshold as per your needs
    setIsMobile(isMobile);
  };
  const changeState = ()=>{
    setclick(!isclick);
  }
  return (
    <div className="sidebar">
      {!isclick && <Navbar />}
      {!isclick && <Search />}
      {isMobile?<Chats changeState={changeState}/>:<Chats/>}
      {isclick && isMobile && <MobileChat/>}
    </div>
  );
};

export default Sidebar;
