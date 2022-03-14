import React from 'react'
import Editor from '../../components/common/Smart/Editor';
import Sidebar from '../../components/common/Smart/Sidebar';


class GettingStarted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarId: ''
        }
    }

    
    saveSidebarId = (sidebarId) => {
        this.setState({ sidebarId })
    }

    render() {
        const { sidebarId } = this.state;

        return (
            <div>
                <Sidebar sidebarId={sidebarId} createEditor={this.createEditor}/>
                <Editor saveSidebarId={this.saveSidebarId} createEditor={this.createEditor}/>
            </div>
        )
    }
}


export default GettingStarted;