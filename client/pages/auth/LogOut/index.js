import React from "react"
// import classes from './Logout.module.css';
import '../../../assets/home-image.jpg';
import { logout } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import Router from "next/router";

class Logout extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		}
	}

	
	componentDidMount() {
		console.log("llllllllllllllllllllllllllll");
		this.props.logout();
	}

	render() {
		
		return (<div>logout</div>)
	}
}

const mapStateToProps = state => {
	// console.log("state", state);
	return {token: state?.authentication?.token};
}
   
const mapDispatchToProps = {
	logout
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
