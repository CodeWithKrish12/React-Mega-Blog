import React from 'react';
import logoImage from '../assets/572.png'; // Import the image

function Logo({ width = '100px' }) {
    return <img src={logoImage} alt="Logo" style={{ width: width }} />; 
}

export default Logo;
