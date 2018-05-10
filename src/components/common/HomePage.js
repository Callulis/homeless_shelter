import React from 'react';
import './SignupLoginPage.css';

const Home = () => {
  return (
    <div id="home">
      <h1>Welcome!</h1>
      <h3>Thank you for visiting our website!</h3>
      <h3>Click on <span id="makeBold">Shelter Posts</span> tab to view all the posts made so far.</h3>
      <h3>Please <span id="makeBold">Sign Up</span> or <span id="makeBold">Login</span> to make a post about a homless shelter and its needs.</h3>
      <h3>&nbsp;&nbsp; &nbsp; &nbsp; - Please make sure to contact the shelter to find out its needs if you haven't already.</h3>
    </div>
  );
}

export default Home;
