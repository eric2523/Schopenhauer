import React from "react";

export class ToolbarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let name = this.props.setting.name 
    this.props.generalSettings[name] = e.target.value
  }

  render() {
    return (
      <div>
        <label htmlFor="input-field">Enter a number for `${this.props.setting.name}`</label>
        <input onChange={this.handleChange} type="number" id="input-field" />
      </div>
    );
  }
}