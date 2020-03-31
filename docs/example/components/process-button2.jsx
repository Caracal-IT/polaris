
function ProcessButton2(props) {    
    ctx = props.ctx; 
    
    clickHandler = () => {
        ctx.wf.setProcess(props.process);
    }
    
    const style = {
        cursor: "pointer",
        color: "white",
        backgroundColor: "hotpink",
        minWidth: "9rem",
        border: "1px solid #757575",
        borderRadius: "5px",
        padding: ".5rem",
        margin: "0 .1rem",
        font: "inherit",
        fontSize: "1rem"
    };

    const element = React.createElement(
        'button',
        { style: style, onClick: () => this.clickHandler()},
        props.caption
    );

    return element;
}
