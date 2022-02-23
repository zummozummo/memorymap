import React from "react"
import classes from './Editor.module.css';
import '../../../../assets/icons-search.svg'
import './icons-search.svg'
import { handleData } from "../../../../store/actions/editorActions";

class Editor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            textSearch: 'dummy text'
        }
    }
    
    handleInputChange = () => {
		console.log(event.target.value, event.target.name);
		this.setState({
			...this.state,
			[event.target.name]: event.target.value})
	}

    componentDidMount() {
        handleData({value: [], type: 'editor'})
    }

    render() {
        return (
            <div className={classes.editor}>
            
			    {/* <label className={classes.labelField} for="text">Search...</label> */}
                <input className={classes.inputSearch} placeholder="Search..." type="text" name="textSearch" id="text" onChange={this.handleInputChange} value={this.state.textSearch} />
                <img className={classes.icon} alt="search" src="/icons-search.svg"/>
            </div>
        )
    }
}


export default Editor