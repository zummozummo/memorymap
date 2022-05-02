import React from "react"
import classes from './SignIn.module.css';
import '../../../assets/home-image.jpg';
import { authenticate } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import Router from "next/router";
class Signin extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			email: 'anjali@email.com',
			password: 'Qwerty@123!@#',
			confirmPassword: '',
			showPwd: false,
			errors: []
		}
	}


	onSubmit = async (event) => {
		event.preventDefault()

		const data = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.authenticate(data)

	}

	componentDidUpdate(prevState, prevProps) {
		// console.log(this.props.token,"this.props.token");
		if (this.props.token) {
			Router.push("/");
			// Router.push("/getting-started");
		}
	}
	handleInputChange = (event) => {
		// console.log(event.target.value, event.target.name);
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
		const { email, password, showPwd, errors } = this.state
		return (
			<div className={classes.container}>
				{/* <div className={classes.leftSignup}>
					<img className={classes.landingImage} src='/images/home-image.jpg'/>
				</div> */}
				<div className={classes.signup}>
					<div className={classes.heading} > <h2 className={classes.text}>Welcome to Memory Map.</h2> </div>
					{/* <div className={classes.heading} > <h2>Already signed up ? Log in</h2> </div> */}
					<div className={classes.buttonField}>
						<a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fmemorymap.dev%2Fapi%2Fusers%2Fgoogle%2Fcallback&client_id=573267777115-176069s8o4ghodq0qmo541otoqv1nv83.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
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
						</a>
					</div>
					<div className={classes.heading}><span className={classes.text} >OR</span></div>
					<form onSubmit={this.onSubmit} >
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
						<div className={classes.buttonField}> <button className={classes.button} type="submit" > LOGIN </button></div >
					</form>
				</div >
			</div>
		)
	}
}

const mapStateToProps = state => {
	// console.log("state", state);
	return { token: state?.authentication?.token };
}

const mapDispatchToProps = {
	authenticate
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
