import React from 'react';
import './SignupLoginPage.css';

const Signup = () => {
  return (
    <div>
		<form action="action_page.php">
		  <div className="container">
		    <h1>Signup</h1>
		    <p>Please use this form to sign up!</p>
		    <hr></hr>

		    <label htmlFor="username"><b>Username</b></label><br></br>
		    <input type="text" placeholder="Enter username" name="username" required></input>
		    <br></br><br></br>

		    <label htmlFor="psw"><b>Password</b></label><br></br>
		    <input type="password" placeholder="Enter Password" name="psw" required></input>
		    <br></br><br></br>

		    <label htmlFor="psw-repeat"><b>Repeat Password</b></label><br></br>
		    <input type="password" placeholder="Repeat Password" name="psw-repeat" required></input>
		    <hr></hr>

		    <button type="submit" id="registerbtn">Register</button>
		  </div>
		</form>
    </div>
  );
}

export default Signup;
