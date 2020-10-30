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
        <div className="ui input">
          <input onChange={this.handleChange} type="number" placeholder={this.props.setting.name} />
        </div>
      </div>
    );
  }
}