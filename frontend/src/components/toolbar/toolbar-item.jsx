import React from "react";

export const ToolbarItem = (props) => {
  return (
    <div className="toolbar-item-container">
      <div className="ui transparent input toolbar-input-container">
        {props.setting.name !== "color" ? (
          <input
            onChange={props.handleChange(props.setting.name)}
            type="number"
            placeholder={props.setting.name}
            value={props.setting.val}
          />
        ) : (
          <input
            onChange={props.handleChange(props.setting.name)}
            type="text"
            placeholder={props.setting.name}
            value={props.setting.val}
          />
        )}
      </div>
    </div>
  );
};
