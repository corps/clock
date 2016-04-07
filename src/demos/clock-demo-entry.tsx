import * as React from "react";
import * as ReactDOM from "react-dom"
import {ClockPageComponent} from "../components/clock-page-component";
import * as n from "netsuke";

var contentEl = document.createElement("DIV");
document.body.appendChild(contentEl);

n.insertStyles(`html, body {
  padding: 0; 
  margin: 0; 
  background: black; 
  color: white;
  line-height: 1.1;
}`);

ReactDOM.render(<ClockPageComponent/>, contentEl);
