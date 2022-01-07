import React from "react"
import classes from './SignIn.module.css';
import '../../../assets/home-image.jpg';
import Image from 'next/image';


class Signin extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			confirmPassword: ''
		}
	}

	onSubmit = (event) => {
		event.preventDefault()
            axios.post('/api/users/signin', {
                email: this.state.email,
                password: this.state.password
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
	}

	handleInputChange = (event) => {
		console.log(event.target.value, event.target.name);
		this.setState({
			...this.state,
			[event.target.name]: event.target.value})
	}

	render() {
		const { email, password, confirmPassword } = this.state
		return (
			<div className={classes.container}>
				<div className={classes.leftSignup}>
					<img className={classes.landingImage} src='/images/home-image.jpg'/>
				</div>
				<div className={classes.signup}>
				  <div className={classes.heading} > <h2 className={classes.text}>Welcome to Memory Map.</h2> </div>
					{/* <div className={classes.heading} > <h2>Already signed up ? Log in</h2> </div> */}
						<form onSubmit={this.onSubmit} >
							<div className={classes.field} >
								<input className={classes.inputField} placeholder="johndoe@example.com" type="email" name="email" id="email" onChange={this.handleInputChange} value={email} />
								<label className={classes.labelField} htmlFor="email">Email</label>
							</div >
							<div className={classes.field} >
								<input className={classes.inputField} placeholder="j@*_7)(3/." type="password" name="password" id="password" onChange={this.handleInputChange} value={password} />
								<label className={classes.labelField} htmlFor="password">Password</label>
							</div >
							<div className={classes.buttonField}> <button  className={classes.button} type="submit" > LOGIN </button></div >
						</form>
				</div >
			</div>
		)
 }
}


export default Signin