import React from "react"
import '../../../../assets/icons-search.svg'
import classes from './Sidebar.module.css';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createBlock, updateBlock } from '../../../../store/helpers/editor';
import { getSidebarId, createsideBar, setactiveId, updateSideBar } from "../../../../store/actions/sidebarActions";
import SidebarItem from "../SidebarItem";
import createTree  from '../../../../helpers/utils/utils';
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
        // console.log(editorRequest);
        createBlock(editorRequest).then((response) => {
            if (response) {
                console.log("this.props?.sidebarList, null, this.props.sidebaractiveId?.id", this.props?.sidebarList, null, this.props.sidebaractiveId?.id);
                const ActiveParent = createTree(this.props?.sidebarList, null, this.props.sidebaractiveId?.id)
                console.log(dummySidebar, response.id);
                this.setState(prevState => ({
                    dummySidebar: {
                        ...dummySidebar,
                        id: response?.id,
                        parent: ActiveParent
                    }
                }), () => {
                    // console.log("this.props.sidebaractiveId", this.props.sidebaractiveId);
                    console.log(ActiveParent, this.state.dummySidebar);
                    console.log("this.props?.sidebarList", this.props?.sidebarList);

                    const sidebarReq = { type: 'sidebar', value: this.state.dummySidebar };
                    updateBlock(sidebarReq, this.props?.token).then((response) => {
                        console.log(response);
                        if (response) {
                            this.props?.setactiveId(response?.value[0])
                            ActiveParent === undefined ? this.props.createsideBar(response?.value[0]) : this.props?.updateSideBar(ActiveParent, response?.value[0])
                        }
                    })
                })
            }
        })

    }

    handleFolder = (type = 'editor-folder') => {
        const { dummySidebarFolder } = this.state;
        const editorRequest = { "value": [""], "type": type }
        // console.log(editorRequest);
        createBlock(editorRequest).then((response) => {
            if (response) {
                const ActiveParent = createTree(this.props?.sidebarList, null, this.props.sidebaractiveId?.id)
                this.setState(prevState => ({
                    dummySidebarFolder: {
                        ...dummySidebarFolder,
                        id: response?.id,
                        parent: ActiveParent
                    }
                }), () => {
                    // console.log("this.state.dummySidebarFolder", this.state.dummySidebarFolder);
                    // console.log("this.props?.sidebarList", this.props?.sidebarList);
                    // console.log("this.props.sidebaractiveId", this.props.sidebaractiveId);
                    // console.log(createTree(this.props?.sidebarList, null, this.props.sidebaractiveId?.id));
                    // typeof currently selected
                    // if folder append in currently selected items parent
                    // if file append in parent tht can be file or folder
                    const sidebarReq = { type: 'sidebar', value: this.state.dummySidebarFolder };
                    updateBlock(sidebarReq, this.props?.token).then((response) => {
                        console.log(response);
                        if (response) {
                            console.log("ActiveParent", ActiveParent);
                            this.props?.setactiveId(response?.value[0]?.id)
                            ActiveParent === undefined ? this.props.createsideBar(response?.value[0]) : this.props?.updateSideBar(ActiveParent, response?.value[0])
                        }
                    })
                })
            }
        })

    }

    renderSideBarList = () => {
        const { data } = this.state;
        const { sidebaractiveId, sidebarListItems } = this.props;
        console.log("data", this.props.sidebarList);
        return (
            // this.props.sidebarList && this.props.sidebarList?.items && 
            sidebarListItems.map((el) => {
                console.log("el", el, sidebaractiveId);
                return <SidebarItem title={el?.name} activeId={el?.id === sidebaractiveId?.id} />
            })
        )
    }

    renderSideBar = () => {
        // const { data, sidebaractiveId } = this.state;
        // console.log(sidebaractiveId);
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
    //         //     console.log(dummySidebar);                  // update the name property, assign a new value                 
    //         //     return { dummySidebar };                                 // return new object jasper object
    //         //   },()=>{


    //         this.setState(prevState => ({
    //             dummySidebar: {
    //                 ...dummySidebar,
    //                 id: id
    //             }
    //         }),() => {
    //             // console.log("Dss", this.state.dummySidebar);
    //             const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
    //             createBlock(sidebarReq).then((response) => {
    //                 if (response) {
    //                     console.log(response?.value[0]);
    //                     this.props.createsideBar(response?.value)
    //                     this.props.setactiveId(id)
    //                 }
    //             })
    //         })
    //     }
    // }

    componentDidUpdate(prevProps) {
        // console.log("sidebar lis updated", prevProps.sidebarList, this.props.sidebarList);
        // if (this.state.data !== this.props.sidebarList) {
        //     this.setState({ data: this.props.sidebarList })
        // }
        // console.log(prevProps.sidebarId, this.props.sidebarId);
        if (prevProps.sidebarId !== this.props.sidebarId) {
            // console.log("if");
            // this.handleSidebar()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(prevState.data, nextProps.sidebarList);
        // if (prevState.data !== nextProps.sidebarList) {
        //     console.log("in");
        //     this.setState({ data: this.props.sidebarList })
        // }
    }
    render() {
        const { data } = this.state;
        // console.log(this.props.sidebarList);
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