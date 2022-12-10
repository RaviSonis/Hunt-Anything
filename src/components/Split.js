import React from "react";
import styled from "styled-components";
import App from "../App";
import ExtraGame from "../ExtraGame";
import GameApp from "../GameApp";
import "./stylesplit.css";

class Split extends React.Component {
  state = {
    renderView: 0,
  };

  clickBtn = (e) => {
    this.setState({
      renderView: +e.target.value,
    });
  };

  render() {
    switch (this.state.renderView) {
      case 1:
        return <App />;
      case 2:
        return <GameApp />;
    }

    return (
      <div >
        <center class="header">
          
          <img src="logo.png" class="logo"></img>
         
        </center>
        <div class="split left">
          <div class="centered">
            <button value={1} onClick={this.clickBtn} class="button"></button>
            {/* </center> */}
          </div>
        </div>
        <div class="split right">
          <div class="centered">
            <button value={2} onClick={this.clickBtn} class="button"></button>
          </div>
        </div>
       
      </div>
      
    );
  }
}
export default Split;
