import React from "react"
import '../../../../assets/icons-search.svg'
import classes from './Sidebar.module.css';
import { connect } from 'react-redux';
import Router from 'next/router';
import { createBlock } from '../../../../store/helpers/editor';
import { createsideBar, setactiveId } from "../../../../store/actions/sidebarActions";
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
    }

    handleInputChange = () => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleAdd = (type='File') => {
        const {dummySidebar} = this.state;
        this.props.createEditor(dummySidebar) 
        
    }

    renderSideBarList = () => {
        const { data, sidebaractiveId } = this.state;
        console.log(sidebaractiveId);
        return (
            data && data.map((el) => {
                return <SidebarItem title={el?.value[0].label}/>
            })
        )
    }

    renderSideBar = () => {
        const { data, sidebaractiveId } = this.state;
        console.log(sidebaractiveId);
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
                        this.props.createsideBar(response)
                        this.props.setactiveId(id)
                    }
                })
            })
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.sidebarList);
        if (prevProps.sidebarList !== this.props.sidebarList) {
            this.setState({ data: this.props.sidebarList })
        }
        if (prevProps.sidebarId !== this.props.sidebarId) {
            this.handleSidebar()
        }
    }

    render() {
        const {data} = this.state;

        return (
            <div className={classes.sidebar}>
                {this.renderSideBar()}
            </div>
        )
    }
}

const mapDispatchToProps = {
    createsideBar,
    setactiveId
}

const mapStateToProps = (state) => {
    // console.log(state, state?.data, "store redcers object");
    return { sidebarList: state?.sidebar?.data || [], sidebaractiveId: state?.sidebar?.activeId || '' }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);