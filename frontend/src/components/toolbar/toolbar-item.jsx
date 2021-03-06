import React from "react";

const parseString = (str) => {
  let words = [];
  let startIdx = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str[i] 
    if (char === char.toUpperCase()){
      words.push(str.slice(startIdx, i))
      startIdx = i;
    }
    if (i === str.length - 1){
      words.push(str.slice(startIdx, i + 1))
    }
  }
  return words.join(" ").toLowerCase();
}

export const ToolbarItem = (props) => {
  const parsedString = parseString(props.setting.name)

  return (
    <div className="toolbar-item-container">
      <div className="ui transparent input toolbar-input-container">
      <span className="toolbar-item-title">{parsedString}</span>
        {props.setting.name !== "color" ? (
          <input
            onChange={props.handleChange(props.setting.name)}
            type="number"
            placeholder={parsedString}
            value={props.setting.val}
          />
        ) : (
          <input
            onChange={props.handleChange(props.setting.name)}
            type="text"
            placeholder={parsedString}
            value={props.setting.val}
          />
        )}
      </div>
    </div>
  );
};
