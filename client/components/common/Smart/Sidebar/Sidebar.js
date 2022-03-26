import React from "react"
import '../../../../assets/icons-search.svg'
import classes from './Sidebar.module.css';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createBlock, updateBlock } from '../../../../store/helpers/editor';
import { getSidebarId, createsideBar, setactiveId, updateSideBar } from "../../../../store/actions/sidebarActions";
import SidebarItem from "../SidebarItem";
import { createTree, clone, FindAcitveFolPushNew }  from '../../../../helpers/utils/utils';
class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dummySidebar: { id: '', name: 'Untitled Doc', label: 'Untitled Doc', type: 'File', parent: '' },
            dummySidebarFolder: { id: '', name: 'Untitled Fol', label: 'Untitled Fol', type: 'Folder', parent: '', items: [] },

            data: this.props.sidebarList,
            sidebaractiveId: this.props.sidebaractiveId,
            // textSearch: 'dummy text'
        }

        // console.log(this.props.sidebarList);
    }

    handleInputChange = () => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleFile = (type = 'editor-file') => {
        const { dummySidebar } = this.state;
        const editorRequest = { "value": [""], "type": type }
        createBlock(editorRequest).then((response) => {
            if (response) {
                const arr = createTree(clone(this.props?.sidebarList), null, this.props.sidebaractiveId?.id)
                const ActiveParent = this.props.sidebaractiveId.type === 'File' ? arr[arr.length - 2] || arr?.[0] : arr?.[1] || arr?.[0];

                this.setState(prevState => ({
                    dummySidebar: {
                        ...dummySidebar,
                        id: response?.id,
                        parent: this.props.sidebaractiveId.type === 'Folder' ? this.props.sidebaractiveId : ActiveParent
                    }
                }), () => {
                    const newList = (FindAcitveFolPushNew(clone(this.props?.sidebarList), this.state.dummySidebar, this.props.sidebaractiveId.type === 'Folder' ? this.props.sidebaractiveId.id : ActiveParent));
                    // const newList = this.props.sidebaractiveId.type === 'Folder' ? FindAcitveFolPushNew(clone(this.props?.sidebarList), this.state.dummySidebar, ActiveParent, this.props.sidebaractiveId) : FindAcitveFilePushNew()
                    const sidebarReq = { type: 'sidebar', value: this.state.dummySidebar };
                    updateBlock(sidebarReq, this.props?.token).then((response) => {
                        if (response) {
                            const res = ActiveParent === localStorage.getItem('token') ? this.props.createsideBar(response?.value[0]) : this.props?.updateSideBar(newList)
                            this.props?.setactiveId(response?.value[0])
                        }
                    })
                })
            }
        })

    }

    handleFolder = (type = 'editor-folder') => {
        const { dummySidebarFolder } = this.state;
        const editorRequest = { "value": [""], "type": type }
        createBlock(editorRequest).then((response) => {
            if (response) {
                const arr = createTree(clone(this.props?.sidebarList), null, this.props.sidebaractiveId?.id)
                const ActiveParent = this.props.sidebaractiveId.type === 'File' ? arr[arr.length - 2] || arr?.[0] : arr?.[1] || arr?.[0];
                this.setState(prevState => ({
                    dummySidebarFolder: {
                        ...dummySidebarFolder,
                        id: response?.id,
                        parent: this.props.sidebaractiveId.type === 'Folder' ? this.props.sidebaractiveId : ActiveParent
                    }
                }), () => {
                    const newList = (FindAcitveFolPushNew(clone(this.props?.sidebarList), this.state.dummySidebarFolder, this.props.sidebaractiveId.type === 'Folder' ? this.props.sidebaractiveId.id : ActiveParent));
                    // if folder append in currently selected items parent
                    // if file append in parent tht can be file or folder
                    const sidebarReq = { type: 'sidebar', value: this.state.dummySidebarFolder };
                    updateBlock(sidebarReq, this.props?.token).then((response) => {
                        if (response) {
                            const res = ActiveParent === localStorage.getItem('token') ? this.props.createsideBar(response?.value[0]) : this.props?.updateSideBar(newList)
                            this.props?.setactiveId(response?.value[0])
                        }
                    })
                })
            }
        })

    }

    renderSideBarList = () => {
        const { data } = this.state;
        const { sidebaractiveId, sidebarListItems } = this.props;
        return (
            sidebarListItems.map((el) => {
                return <SidebarItem title={el?.id} activeId={el?.id === sidebaractiveId?.id} />
            })
        )
    }

    renderSideBar = () => {
        return (
            <React.Fragment>
                <div onClick={() => { this.handleFile('editor-file') }}>add file</div>
                <div onClick={() => { this.handleFolder('editor-folder') }}>add folder</div>
                <div>{this.renderSideBarList()}</div>
            </React.Fragment>
        )
    }

    // handleSidebar = () => {
    //     const {dummySidebar} = this.state;
    //     const id = this.props?.sidebarId
    //     if (id) {

    //         // this.setState(prevState => {
    //         //     let dummySidebar = Object.assign({}, prevState.dummySidebar);  // creating copy of state variable jasper
    //         //     dummySidebar.id = id;   
    //         //     return { dummySidebar };                                 // return new object jasper object
    //         //   },()=>{


    //         this.setState(prevState => ({
    //             dummySidebar: {
    //                 ...dummySidebar,
    //                 id: id
    //             }
    //         }),() => {
    //             const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
    //             createBlock(sidebarReq).then((response) => {
    //                 if (response) {
    //                     this.props.createsideBar(response?.value)
    //                     this.props.setactiveId(id)
    //                 }
    //             })
    //         })
    //     }
    // }

    componentDidUpdate(prevProps) {
        // if (this.state.data !== this.props.sidebarList) {
        //     this.setState({ data: this.props.sidebarList })
        // }
        if (prevProps.sidebarId !== this.props.sidebarId) {
            // console.log("if");
            // this.handleSidebar()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // if (prevState.data !== nextProps.sidebarList) {
        //     this.setState({ data: this.props.sidebarList })
        // }
    }
    render() {
        const { data } = this.state;
        return (
            <div className={classes.sidebar}>
                {this.renderSideBar()}
            </div>
        )
    }
}

const mapDispatchToProps = {
    createsideBar,
    setactiveId,
    getSidebarId,
    updateSideBar
}

const mapStateToProps = (state) => {
    console.log(state, state?.sidebar, "store redcers object");
    return {
        sidebarList: state?.sidebar?.data || [],
        sidebarListItems: state?.sidebar?.data?.items || [],
        sidebaractiveId: state?.sidebar?.activeId || '',
        token: state?.authentication?.token || '',
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);