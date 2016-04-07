import * as React from "react";
import * as n from "netsuke";

interface Props {
  time:Date
  style?:React.CSSProperties
}

export class ClockComponent extends React.Component<Props, {}> {
  render() {
    var minutes = this.props.time.getMinutes();
    var hours = this.props.time.getHours();
    return <div style={this.props.style}>
      {hours < 10 ? "0" + hours : hours}
      <span style={ this.props.time.getSeconds() % 2 === 0 ? { color:  "transparent" } : null}>
        :
        </span>
      {minutes < 10 ? "0" + minutes : minutes}
    </div>;
  }
}