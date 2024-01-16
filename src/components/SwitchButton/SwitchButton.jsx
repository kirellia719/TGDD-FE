import { useState } from "react";
import "./SwitchButton.scss";

const SwitchButton = ({ onSwitch, style }) => {
    const [on, setOn] = useState(false);
    const toggle = () => {
        setOn(prev => !prev);
        onSwitch && onSwitch();
    }
    return (
        <div className="toggle-switch" style={style}>
            <span className={`switch ${on ? "on" : ""}`} onClick={toggle}></span>
        </div>
    );
}

export default SwitchButton;