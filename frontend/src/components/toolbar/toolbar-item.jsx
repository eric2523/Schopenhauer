import React from "react";

export const ToolbarItem = (props) => {
  return (
    <div className="toolbar-item-container">
      <div className="ui transparent input toolbar-input-container">
        <input
          onChange={props.handleChange(props.setting.name)}
          type="number"
          placeholder={props.setting.name}
        />
      </div>
    </div>
  );
}