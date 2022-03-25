import React from "react"
import Link from 'next/link'
import classes from './Header.module.css';
import Logo from '../../Presentational/Logo';
import { logout } from '../../../../store/actions/authActions';
import { connect } from 'react-redux';

const menuList = [
	{
		link: '/auth/signup',
		label: 'Sign Up',
		id: 1
	},
	{
		link: '/auth/signin',
		label: 'Sign In',
		id: 2
	}
]
class Header extends React.Component {
	render() {
		return (
			<React.Fragment>
				<header className={classes.header}>
					<Link href='/'>
						<a>
							<Logo />
						</a>
					</Link>
						<ul>
							<li>
								<a target="_blank" href='https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19119606#questions/10660766'>MY LEARNING</a>
							</li>								
							<div className={classes.vl}></div>
							{!(this.props.isSignedin || this.props.isLoggedin) && <li>
								<Link href='/auth/SignUp'><a>SIGNUP</a></Link>
							</li>}
							<div className={classes.vl}></div>
							{!(this.props.isSignedin || this.props.isLoggedin) && <li>
								<Link href='/auth/SignIn'><a>SIGNIN</a></Link>
							</li>}
							{(this.props.isSignedin || this.props.isLoggedin) && <li>
								<Link href='/auth/LogOut'><a>SIGNOUT</a></Link>
							</li>}
							{/* <li>
								<Link onClick={()=>{this.props.logout()}}><a>SIGNOUT</a></Link>
							</li> */}
						</ul>
				</header>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
    // console.log("state", state);
    return {
        token: state?.authentication?.token || '',
        isLoggedin: state?.authentication?.isLoggedin,
        isSignedin: state?.authentication?.isSignedin,
        sidebaractiveId: state?.sidebar?.activeId?.id || '',
        sidebarList: state?.sidebar?.data || [],
        editorData: state?.editor?.data || []
    };
}

const mapDispatchToProps = {
	logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);