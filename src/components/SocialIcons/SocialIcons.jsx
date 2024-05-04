import React, {useEffect, useState} from "react";
import {SocialIcon} from "react-social-icons";
import "./SocialIcons.css";


const SocialIcons = ({urls})=> {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let timer;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timer);

            timer = setTimeout(() => {
                setIsScrolling(false);
            }, 200);
        };

        window.addEventListener('scroll', handleScroll); //Agrega evento scroll

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    return (
        // Renderizado de los iconos sociales
        <div className={`social-icons ${isScrolling ? "scrolled" : ""}`}>
            {urls.map((url, index) => (
        
            <SocialIcon key={index} url={url} className="social-icon" />
            ))}
        </div>
    );
};

export default SocialIcons;