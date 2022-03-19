import React from "react"
import '../../../../assets/icons-search.svg'
import classes from './Sidebar.module.css';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createBlock } from '../../../../store/helpers/editor';
import { getSidebarId, createsideBar, setactiveId } from "../../../../store/actions/sidebarActions";
import SidebarItem from "../SidebarItem";
class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dummySidebar: { id: '', value: 'Untitled Doc', label: 'Untitled Doc', type: 'File' },
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

    handleAdd = (type='File') => {
        const {dummySidebar} = this.state;
        const editorRequest = { "value": [""], "type": 'editor-file' }
        // console.log(editorRequest);
        createBlock(editorRequest).then((response) => {
            if (response) {
                this.setState(prevState => ({
                    dummySidebar: {
                        ...dummySidebar,
                        id: response?.id
                    }
                }),() => {
                    // console.log("Dss", this.state.dummySidebar);
                    const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
                    createBlock(sidebarReq).then((response) => {
                        if (response) {
                            this.props?.createsideBar(response?.value[0])
                            this.props?.setactiveId(response?.value[0]?.id)
                        }
                    })
                })
            }
        })
        
    }

    renderSideBarList = () => {
        const { data } = this.state;
        const { sidebaractiveId } = this.props;
        // console.log("data", this.props.sidebarList, this.props.sidebarList);
        return (
            this.props.sidebarList && 
            this.props.sidebarList.map((el) => {
                // console.log("el", el);
                return <SidebarItem title={el?.id} activeId={el?.id === sidebaractiveId}/>
            })
        )
    }

    renderSideBar = () => {
        // const { data, sidebaractiveId } = this.state;
        // console.log(sidebaractiveId);
        return (
            <React.Fragment>
                <div onClick={() => {this.handleAdd()}}>add file</div>
                <div onClick={() => {this.handleAdd('Folder')}}>add folder</div>
                <div>{this.renderSideBarList()}</div>
            </React.Fragment>
        )
    }

    handleSidebar = () => {
        const {dummySidebar} = this.state;
        const id = this.props?.sidebarId
        if (id) {

            // this.setState(prevState => {
            //     let dummySidebar = Object.assign({}, prevState.dummySidebar);  // creating copy of state variable jasper
            //     dummySidebar.id = id;   
            //     console.log(dummySidebar);                  // update the name property, assign a new value                 
            //     return { dummySidebar };                                 // return new object jasper object
            //   },()=>{


            this.setState(prevState => ({
                dummySidebar: {
                    ...dummySidebar,
                    id: id
                }
            }),() => {
                // console.log("Dss", this.state.dummySidebar);
                const sidebarReq = { value: this.state.dummySidebar, type: 'sidebar' }
                createBlock(sidebarReq).then((response) => {
                    if (response) {
                        console.log(response?.value[0]);
                        this.props.createsideBar(response?.value[0])
                        this.props.setactiveId(id)
                    }
                })
            })
        }
    }

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
        const {data} = this.state;
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
    getSidebarId
}

const mapStateToProps = (state) => {
    // console.log(state, state?.sidebar.data, "store redcers object");
    return { sidebarList: state?.sidebar?.data || [], sidebaractiveId: state?.sidebar?.activeId || '' }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);