import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import "../styles/footer.css";
const Footer = () => {
  return (
    <div className="footer">
       Made with <FontAwesomeIcon icon={faHeart} beatFade style={{color: "#fb3302",}} /> by <a href="https://affanrashid.netlify.app">Affan Rashid</a>
    </div>
  )
  }
  

export default Footer
