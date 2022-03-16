import React from "react"
import classes from './Editor.module.css';
import '../../../../assets/icons-search.svg'
import './icons-search.svg'
import { saveEditor } from "../../../../store/actions/editorActions";
import { connect } from 'react-redux';
import { createBlock } from '../../../../store/helpers/editor';
// import { saveSidebarId } from '../../../../store/helpers/sidebar';

class Editor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.editorData,
            textSearch: 'dummy text'
        }
        console.log("consytr",this.props);
    }

    handleInputChange = () => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    renderEditor = () => {
        const { data } = this.state;

        // console.log(data);
        return (
            data && data.map((el) => {
                return <ul><li>{el?.type}---{el?.value || 'none'}</li></ul>
            })
        )
        return (<React.Fragment>
            {data[0].value}----{data.type}
            {/* <label className={classes.labelField} for="text">Search...</label>
            < input className = { classes.inputSearch } placeholder = "Search..." type = "text" name = "textSearch" id = "text" onChange = { this.handleInputChange } value = { this.state.textSearch } />
            <img className={classes.icon} alt="search" src="/icons-search.svg" /> */}
            </React.Fragment>)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editorData !== this.props.editorData) {
            this.setState({ data: this.props.editorData })
        }
    }

    componentDidMount()  {
        // condition for signup'
        console.log(this.props);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhthis.props");
        
        const editorRequest = { "value": [""], "type": 'editor-file' }
        createBlock(editorRequest).then((response) => {
            if (response) {
                this.props?.saveEditor(editorRequest)    // not required actually
                this.props?.saveSidebarId(response?.id)
            }
        })
    }

    render() {
        return (
            <div className={classes.editor}>
                {this.renderEditor()}
            </div>
        )
    }

    // render() {
    //     return (
    //         <div className={classes.editor}>

    // 		    {/* <label className={classes.labelField} for="text">Search...</label> */}
    //             <input className={classes.inputSearch} placeholder="Search..." type="text" name="textSearch" id="text" onChange={this.handleInputChange} value={this.state.textSearch} />
    //             <img className={classes.icon} alt="search" src="/icons-search.svg"/>
    //         </div>
    //     )
    // }
}

const mapStateToProps = (state) => {
	// console.log("state", state);
	return {editorData: state?.editor?.data || []};
}

const mapDispatchToProps = {
    saveEditor,
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);