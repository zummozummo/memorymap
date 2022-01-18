import React from "react"
import classes from './Signup.module.css';
import '../../../assets/home-image.jpg';
import useRequest from "../../../hooks/useRequest";
import Router from 'next/router';
class Signup extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: 'anjali',
			email: 'anjali@email.com',
			password: 'Qwerty@123!@#',
			showPwd: false,
			errors: []
		}
	}

	onSubmit = async (event) => {
		event.preventDefault()

		const response = await (useRequest({
			url: '/api/users/signup',
			method: 'post',
			body: {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			}
		}))()
		if (response.errors) {
			this.setState({errors: response.errors})
		} else {
			console.log(response)
			Router.push('/getting-started')
		}
	}


	handleInputChange = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		})
	}

	togglePwd = () => {
		this.setState((prevState) => ({
			showPwd: !prevState.showPwd
		}));
	}

	render() {
		const { email, password, username, showPwd, errors } = this.state
		return (
			<div className={classes.container}>
				{/* <div className={classes.leftSignup}>
					<img className={classes.landingImage} src='/images/home-image.jpg'/>
				</div> */}
				<div className={classes.signup}>
					<div className={classes.heading} > <h2 className={classes.text}>Welcome to Memory Map.</h2> </div>
					{/* <div className={classes.heading} > <h2>Already signed up ? Log in</h2> </div> */}
					{/* <div className={classes.buttonField}> 
								<button
								className={classes.button}
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								// onClick={handleGoogleLogin}
								>
								<img
									width="20px"
									style={{ marginBottom: "0px", marginRight: "7px" }}
									alt="Google sign-in"
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
								/>
								Login with Google
								</button>
							</div>
							<div className={classes.heading}><span className={classes.text} >OR</span>
						</div> */}
					<form onSubmit={this.onSubmit} >
						<div className={classes.field} >
							<input className={classes.inputField} placeholder="john" type="text" name="username" id="username" onChange={this.handleInputChange} value={username} />
							<label className={classes.labelField} htmlFor="username">Username</label>
						</div >
						<div className={classes.field} >
							<input className={classes.inputField} placeholder="johndoe@example.com" type="email" name="email" id="email" onChange={this.handleInputChange} value={email} />
							<label className={classes.labelField} htmlFor="email">Email</label>
						</div >
						<div className={classes.field} >

							{showPwd ?
								<img
									onClick={this.togglePwd}
									className={classes.eyeIcon}
									width="20px"
									style={{ marginBottom: "0px", marginRight: "7px" }}
									alt="hideEyeIcon"
									src='/images/hideEyeIcon.png'
								/> :
								<img
									onClick={this.togglePwd}
									className={classes.eyeIcon}
									width="20px"
									style={{ marginBottom: "0px", marginRight: "7px" }}
									alt="eyeIcon"
									src='/images/eyeIcon.png'
								/>}

							<input className={classes.inputField} placeholder="j@*_7)(3/." type={showPwd ? "text" : "password"} name="password" id="password" onChange={this.handleInputChange} value={password} />
							<label className={classes.labelField} for="password">Password</label>
						</div >

						{errors.length > 0 && <div>
							<h4>Ooops...</h4>
							<ul>{errors.map(err => <li key={err.message}>{err.message}</li>)}</ul>
						</div>}							
						<div className={classes.buttonField}> <button className={classes.button} type="submit" > JOIN US </button></div >
					</form>
				</div >
			</div>
		)
	}
}


export default Signup