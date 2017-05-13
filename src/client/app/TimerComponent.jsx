import React from 'react';
import styler from 'react-styling'

const style = styler
`
	span:
		padding: 15px
`
export default class TimerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { date: new Date() };
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  componentWillUnmount() {

  }

  render() {
    return (<span style={style.span}>{this.state.date.toLocaleTimeString()}</span>);
  }

}


