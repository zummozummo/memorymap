import React from "react"
import Link from 'next/link'
import classes from './Header.module.css';
import Logo from '../../Presentational/Logo';


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
							<li>
								<Link href='/auth/SignUp'><a>SIGNUP</a></Link>
							</li>
							<div className={classes.vl}></div>
							<li>
								<Link href='/auth/SignIn'><a>SIGNIN</a></Link>
							</li>
						</ul>
				</header>
			</React.Fragment>
		)
	}
}


export default Header