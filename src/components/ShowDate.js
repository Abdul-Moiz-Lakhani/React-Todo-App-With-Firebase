import React, {Component} from 'react';

export default class ShowDate extends Component {

    constructor() {
      super();

      this.launchClock();

      this.state = {
        daysList : ["SUN","MON","TUE","WED","THU","FRI","SAT"],
        days: (new Date()).getDay(),
        hrs: (new Date()).getHours(),
        min: (new Date()).getMinutes(),
        sec: (new Date()).getSeconds()
      }
    }
    
    launchClock() {
      setInterval(()=>{
        this.setState({
          daysList : ["SUN","MON","TUE","WED","THU","FRI","SAT"],
          days: (new Date()).getDay(),
          hrs:  this.checkTime((new Date()).getHours()),
          min:  this.checkTime((new Date()).getMinutes()),
          sec:  this.checkTime((new Date()).getSeconds())
      }) }, 1000)
        
    }

    checkTime(i) {
        // add zero in front of numbers < 10
        if (i < 10)
        {
            i = "0" + i
        };
          
        return i;
    }

    render() {
      return (
        <div id="timeArea">
            <div id="timeToday">
              <span id="days">{this.state.daysList[this.state.days]}</span>
              <span id="hrs">{this.state.hrs}</span>
              :
              <span id="min">{this.state.min}</span>
              <span id="sec">{this.state.sec}</span>
            </div>
        </div>
      )
  }
}