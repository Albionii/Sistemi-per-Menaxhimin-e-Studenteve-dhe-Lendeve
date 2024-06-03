import { Typography } from "@mui/material";
import React, { Component } from "react";

class LiveClock extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h4" fontWeight={'bold'}>{this.state.date.toLocaleTimeString()}</Typography>
      </div>
    );
  }
}

export default LiveClock;