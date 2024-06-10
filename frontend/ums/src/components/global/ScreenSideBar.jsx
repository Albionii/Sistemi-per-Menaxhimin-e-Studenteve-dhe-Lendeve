import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const ScreenSideBar = ({ user, isSmallScreen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        };
  }, []);
        
        
  return (
    <>
      {isSmallScreen ? (<Sidebar user={user} isMobile={!isMobile} isSmallScreen={isSmallScreen}/>) : (<Sidebar user={user} isMobile={isMobile} isSmallScreen={isSmallScreen}/>)}
    </>
  );
};

export default ScreenSideBar;