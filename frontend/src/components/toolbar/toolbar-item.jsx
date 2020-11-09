import React from "react";

export class ToolbarItem extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   let name = this.props.setting.name;
  //   this.props.generalSettings[name] = parseInt(e.target.value);
  // }

  render() {
    return (
      <div className="toolbar-item-container">
        <div className="ui transparent input toolbar-input-container">
          <input
            onChange={this.props.handleChange(this.props.setting.name)}
            type="number"
            placeholder={this.props.setting.name}
          />
        </div>
      </div>
    );
  }
}
