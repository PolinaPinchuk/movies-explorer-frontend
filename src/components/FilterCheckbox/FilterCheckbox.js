import { useRef } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
    const { defaultValue, onChange } = props;
  
    const checkboxRef = useRef();
    const onValueChange = () => {
      onChange(checkboxRef.current.checked);
    };
    return <input type="checkbox" className="filterCheckbox" ref={checkboxRef} defaultChecked={defaultValue} onChange={onValueChange}></input>;
}

export default FilterCheckbox;