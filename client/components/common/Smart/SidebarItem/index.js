import React from 'react';

class SidebarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    render() {
        const {} = this.state;
        const {title} = this.props;
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaas");
        return (<div style={{color: this.props.activeId ? 'red' : 'black'}}>
            {title}
        </div>)
    }
}

export default SidebarItem