import { getCookieParser } from 'next/dist/server/api-utils';
import React from 'react'
import Editor from '../../components/common/Smart/Editor/Editor';
import Sidebar from '../../components/common/Smart/Sidebar/Sidebar';
import { connect } from 'react-redux';
import { saveEditor, updateEditor } from "../../store/actions/editorActions";
import { fetchactiveId, setactiveId, setAuthId } from "../../store/actions/sidebarActions";
import { createBlock, updateBlock, getBlock } from '../../store/helpers/editor';
import { getSidebarId, createsideBar, updateSideBar } from "../../store/actions/sidebarActions";
import {
	clone,
	FindActiveFolPushNew,
} from "../../helpers/utils/utils";
// import Quill from 'quill';

// import dynamic from "next/dynamic";

// const DynamicComponentWithNoSSR = dynamic(() => import("../components/Stories"), {
//   ssr: false,
// });

// export default () => <DynamicComponentWithNoSSR />;
class GettingStarted extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarId: '',
            dummySidebar: { id: '', name: 'Untitled Doc', label: 'Untitled Doc', type: 'File', parent: '', delete: false },
            sidebarList: [],
            isLoggedin: props.isLoggedin
        }
    }


    saveSidebarId = (sidebarId) => {
        this.setState({ sidebarId })
    }

    componentDidMount(prevProps) {

            if (this.props.isLoggedin && this.props.isSignedin) {
                // this.fetchData()
                getBlock(this.props?.token).then((response) => {
                        const newList = clone(this.props?.sidebarList)
                        for (let node of response.value) {
                            newList.items.push(node)
                        }
                        this.props.updateSideBar(newList)
                        this.props.setactiveId(response?.value?.[0]) 
                        getBlock(this.props?.sidebaractiveId?.id).then((response) => {  // change it later to above console value
                            this.props?.saveEditor(response?.value)    // not required actually
                        })
                })
            } else if (!this.props.isLoggedin && this.props.isSignedin) {
                const editorRequest = { "value": [""], "type": 'editor-file' }
                typeof window !== 'undefined' && this.props.setAuthId(localStorage.getItem('token'))        //doubt in syntax
                createBlock(editorRequest).then((response) => {
                    if (response) {
                        const { dummySidebar } = this.state;
                        const id = response?.id
                        this.props?.saveEditor(editorRequest)    // not required actually
                        // this.saveSidebarId(response?.id)
                        this.setState(prevState => ({
                            dummySidebar: {
                                ...dummySidebar,
                                id: response?.id,
                                parent: localStorage.getItem('token')
                            }
                        }), () => {
                            const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
                            createBlock(sidebarReq).then((response) => {
                                if (response) {
                                    this.props.createsideBar(response?.value[0])
                                    this.props.setactiveId(this.state.dummySidebar)
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
    getSidebarId,
    setAuthId,
    updateSideBar
}


export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted);