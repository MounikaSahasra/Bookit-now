import React, { useState } from "react";
import "./choose.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function OptionBox({ label, icon, onClick }) {
    const [hover, setHover] = useState(false);

    const boxClass = `option-box${hover ? " hover" : ""}`;

    return (
        <div
            className={boxClass}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label={`Login as ${label}`}
        >
            <span className="icon">{icon}</span>
            {label}
        </div>
    );
}

export default function Choose() {
    const navigate = useNavigate();
    return (
        <div className="choose-container">
            <div className="choose-title">Login as</div>
            <div className="choose-options">
                <Link to="/userlogin" ><OptionBox label="User" icon="🙋" /></Link>
                <Link to="/login" ><OptionBox label="Admin" icon="💻"/></Link>
            </div>
        </div>
    );
}
