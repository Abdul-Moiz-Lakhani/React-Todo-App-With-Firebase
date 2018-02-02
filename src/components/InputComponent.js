import React, {Component} from 'react';

export default class InputComponent extends Component {

  constructor() {
    super();
      
    this.state = {
      borderColor : ""
    }
        
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentDidMount(){
      this.initialBorderColor = this.props.initialBorderColor;
      this.focusBorderColor = this.props.focusBorderColor;
      this.setState({borderColor: this.props.initialBorderColor})
  }

  handleOnFocus() {
      this.setState({borderColor : this.focusBorderColor});
  }

  handleOnBlur(e) {
      this.setState({
        borderColor : this.initialBorderColor
      });
  }

  render() {

    let borderStyle = {
      borderBottomWidth: "2px", 
      borderBottomStyle:"solid", 
      transition : "all 1s",
      transitionTimingFunction : "ease-out", 
      borderBottomColor: this.state.borderColor
    }
    
    return (
        <div className={this.props.divClassName} style={borderStyle}>
          <input className={this.props.inputFieldClassName} type={this.props.type} name={this.props.name} ref={this.props.id} id={this.props.id} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} value={this.props.value} onChange={this.props.onChange} placeholder="Enter Here" required/>
        </div>
    )
  }
}