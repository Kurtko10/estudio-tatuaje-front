import React from "react";
import "./ButtonCita.css";
import useScrollOpacity from "../../utils/ScrollOpacityComponent";

const Button = ({ text, onClick, className }) => {
  const isScrolling = useScrollOpacity();

  return (
    <ul>
      <li onClick={onClick} className={`${className} ${isScrolling ? "scrolled" : ""}`}>
        <span>{text}</span>
      </li>
    </ul>
  );
};

export default Button;

