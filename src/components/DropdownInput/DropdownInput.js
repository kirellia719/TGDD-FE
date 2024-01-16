import { useEffect, useState } from "react";
import "./DropdownInput.scss";

const DropdownInput = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect&& onSelect(option);
    };

    useEffect(() => {
        setSelectedOption("");
    }, [options])

    return (
        <div className='Dropdown-Input'>
            <select
                value={selectedOption}
                onChange={(e) => handleSelect(e.target.value)}
            >
                <option value="" disabled>Chọn một</option>
                {options.map((option) => (
                    <option key={option.ID} value={option.ID}>
                        {option.Ten}, {option.Ten_Phuong_Xa}, {option.Ten_Quan_Huyen}, {option.Ten_Tinh} 
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownInput;