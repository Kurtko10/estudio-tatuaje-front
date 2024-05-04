import React from "react";
import { SocialIcon } from "react-social-icons";
import "./SocialIcons.css";
import useScrollOpacity from "../../utils/ScrollOpacityComponent"; 

const SocialIcons = ({ urls }) => {
  const isScrolling = useScrollOpacity(); 

  return (
    // Renderiza los iconos sociales con la clase condicional para la opacidad
    <div className={`social-icons ${isScrolling ? "scrolled" : ""}`}>
      {urls.map((url, index) => (
        <SocialIcon key={index} url={url} className="social-icon" />
      ))}
    </div>
  );
};

export default SocialIcons;