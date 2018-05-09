import React from 'react';
import './SignupLoginPage.css';

const Login = () => {
  return (
    <div>
		<form action="action_page.php.php">
		  <div class="container">
		    <label for="uname"><b>Username</b></label>
		    <input type="text" placeholder="Enter Username" name="uname" required></input>

		    <label for="psw"><b>Password</b></label>
    		<input type="password" placeholder="Enter Password" name="psw" required></input>

    		<button type="submit" id="loginbtn">Login</button>
		  </div>


		</form>   	
    </div>
  );
}

export default Login;
