import React from "react"
import '../../../../assets/icons-search.svg'
import './icons-search.svg'

class Sidebar extends React.Component {

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

    }

    render() {
        return (
            <div className={classes.sidebar}>
            
            </div>
        )
    }
}


export default Sidebar