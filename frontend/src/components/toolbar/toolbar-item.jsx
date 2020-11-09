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
      debugger
      words.push(str.slice(startIdx, i + 1))
    }
  }
  return words.join(" ").toLowerCase();
}

export const ToolbarItem = (props) => {
  const parsedString = parseString(props.setting.name)

  return (
    <div className="toolbar-item-container">
      <h1>{parsedString}</h1>
      <div className="ui transparent input toolbar-input-container">
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
