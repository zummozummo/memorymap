import { getCookieParser } from 'next/dist/server/api-utils';
import React from 'react'
import Editor from '../../components/common/Smart/Editor/Editor';
import Sidebar from '../../components/common/Smart/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { saveEditor, updateEditor } from "../../store/actions/editorActions";
import { fetchactiveId, setactiveId } from "../../store/actions/sidebarActions";
import { createBlock, updateBlock, getBlock } from '../../store/helpers/editor';
import { getSidebarId, createsideBar } from "../../store/actions/sidebarActions";

class GettingStarted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarId: '',
            dummySidebar: { id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File' },
            sidebarList: [],
            isLoggedin: props.isLoggedin
        }
    }


    saveSidebarId = (sidebarId) => {
        this.setState({ sidebarId })
    }

    componentDidMount(prevProps) {
        // console.log(prevProps.isLoggedin, this.props.isLoggedin, prevProps.isSignedin, this.props.isSignedin);
        // if (prevProps.isLoggedin !== this.props.isLoggedin || prevProps.isSignedin !== this.props.isSignedin) {
            if (this.props.isLoggedin && this.props.isSignedin) {
                // this.fetchData()
                getBlock({ 'token': this.props.token }).then((response) => {
                    console.log(response);
                    this.setState({ sidebarList: response?.value }, () => {
                        this.props.createsideBar(response?.value) //check
                        this.props.setactiveId(response?.value?.[0].id)
                    })
                })
            } else if (!this.props.isLoggedin && this.props.isSignedin) {
                const editorRequest = { "value": [""], "type": 'editor-file' }
                createBlock(editorRequest).then((response) => {
                    if (response) {
                        const { dummySidebar } = this.state;
                        const id = response?.id
                        this.props?.saveEditor(editorRequest)    // not required actually
                        // this.saveSidebarId(response?.id)
                        this.setState(prevState => ({
                            dummySidebar: {
                                ...dummySidebar,
                                id: response?.id
                            }
                        }), () => {
                            // console.log("Dss", this.state.dummySidebar);
                            const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
                            createBlock(sidebarReq).then((response) => {
                                if (response) {
                                    this.props.createsideBar(response?.value[0])
                                    this.props.setactiveId(id)
                                }
                            })
                        })
                    }
                })
                // this.handleData()
            }
        // }
    }

    render() {
        const { sidebarId, sidebarList } = this.state;
        return (
            <div>
                {(this.props.isLoggedin || this.props.isSignedin) && <Sidebar sidebarId={sidebarId} createEditor={this.createEditor} />}
                {(this.props.isLoggedin || this.props.isSignedin) && <Editor saveSidebarId={this.saveSidebarId} createEditor={this.createEditor} />}
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        token: state?.authentication?.token || '',
        isLoggedin: state?.authentication?.isLoggedin,
        isSignedin: state?.authentication?.isSignedin,
        sidebaractiveId: state?.sidebar?.activeId || '',
        sidebarList: state?.sidebar?.data || [],
        editorData: state?.editor?.data || []
    };
}

const mapDispatchToProps = {
    saveEditor,
    fetchactiveId,
    updateEditor,
    createsideBar,
    setactiveId,
    getSidebarId
}


export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted);