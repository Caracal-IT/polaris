class ProcessButton extends React.Component {
  props;
    get ctx() { return this.props.ctx; }
  
    constructor(props) {
      super(props);
    }
  
    clickHandler() {
      this.ctx.wf.setProcess(this.props.process);
    }
  
    render() {
      const style = {
        cursor: "pointer",
        color: "white",
        backgroundColor: "green",
        minWidth: "9rem",
        border: "1px solid #757575",
        borderRadius: "5px",
        padding: ".5rem",
        margin: "0 .1rem",
        font: "inherit",
        fontSize: "1rem"
      };

      return <button style={style} onClick={this.clickHandler.bind(this)}>{this.props.caption}</button>;
    }
  }