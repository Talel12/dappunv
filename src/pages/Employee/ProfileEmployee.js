import React from "react";
import "./employee.css"
const ProfileEmployee = () => {
  return <div>
    <div class="card-container">
	<span class="pro">PRO</span>
	<img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
	<h3>Ricky Park</h3>
	<h6>New York</h6>
	<p>User interface designer and <br/> front-end developer</p>

	<div class="skills">
		<h6>Skills</h6>
		<ul>
			<li>UI / UX</li>
			<li>Front End Development</li>
			<li>HTML</li>
			<li>CSS</li>
			<li>JavaScript</li>
			<li>React</li>
			<li>Node</li>
		</ul>
	</div>
</div>


  </div>;
};

export default ProfileEmployee;
