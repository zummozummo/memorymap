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

        return (<div>
            {title}
        </div>)
    }
}

export default SidebarItem