import { useRef } from "react";
import "./Textarea.scss";

const Textarea = ({value = "", maxheight = 76, onChange, ...props }) => {
    const textRef = useRef();

    const textChange = (e) => {
        const textarea = textRef.current;
        textarea.style.height = "auto";
        let scHeight = e.target.scrollHeight;
        if (scHeight > maxheight) {
            textarea.style.height = `${maxheight}px`;
            textarea.classList.remove("scrollY");
        } else {
            textarea.style.height = `${scHeight}px`;
            textarea.classList.add("scrollY");
        }

        onChange && onChange(textarea.value);

    }
    return (
        <div className="Textarea">
            <textarea
                defaultValue={value}
                {...props}
                ref={textRef}
                onChange={textChange}
            />
        </div>
    );
}

export default Textarea;