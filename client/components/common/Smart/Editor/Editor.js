import React from "react"
import classes from './Editor.module.css';
import '../../../../assets/icons-search.svg'
import './icons-search.svg'
import { saveEditor, updateEditor } from "../../../../store/actions/editorActions";
import { fetchactiveId } from "../../../../store/actions/sidebarActions";
import { connect } from 'react-redux';
import { createBlock, updateBlock } from '../../../../store/helpers/editor';
// import { saveSidebarId } from '../../../../store/helpers/sidebar';

class Editor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorData: this.props.sidebaractiveId,
            sidebaractiveId: this.props.sidebaractiveId,
            textSearch: 'dummy text'
        }
    }

    handleInputChange = () => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleEditorData = () => {
        const { editorData } = this.state;
        
        const editorRequest = { "id": this.props.sidebaractiveId, "value": [editorData], "type": 'editor-file' }
        updateBlock(editorRequest).then((response) => {
            if (response) {
                // this.props?.updateEditor(editorRequest)    // not required actually
                // this.props?.updateSidebarId(response?.id)
            }
        })
        // this.props.updateEditor({data: editorData})
    }

    renderEditor = () => {
        const { editorData } = this.state;
        console.log(editorData);
        return (
            <div>
                <textarea id="textarea1"
                    class="input shadow"
                    name="editorData"
                    rows="15"
                    cols="100"
                    placeholder="Your text here " onChange={this.handleInputChange} value={editorData}>
                </textarea>
            </div>
        )
        // console.log(data);
        // return (
        //     data && data.map((el) => {
        //         return <ul><li>{el?.type}---{el?.value || 'none'}</li></ul>
        //     })
        // )
        // return (<React.Fragment>
        //     {data[0].value}----{data.type}
        //     {/* <label className={classes.labelField} for="text">Search...</label>
        //     < input className = { classes.inputSearch } placeholder = "Search..." type = "text" name = "textSearch" id = "text" onChange = { this.handleInputChange } value = { this.state.textSearch } />
        //     <img className={classes.icon} alt="search" src="/icons-search.svg" /> */}
        //     </React.Fragment>)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sidebaractiveId !== this.props.sidebaractiveId) {
            this.setState({ sidebaractiveId: this.props.sidebaractiveId, editorData: this.props.sidebaractiveId })
        }
    }

    componentDidMount() {
        // condition for signup'
        
    }

    render() {
        return (
            <div className={classes.editor}>
                {this.renderEditor()}
                <div><button type="submit" onClick={this.handleEditorData} value="save editor">save editor</button></div>
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
    return { editorData: state?.editor?.data || [], sidebaractiveId: state?.sidebar?.activeId || '' };
}

const mapDispatchToProps = {
    saveEditor,
    fetchactiveId,
    updateEditor,
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);