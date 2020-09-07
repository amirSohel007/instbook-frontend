import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";




ReactDOM.render(
	<React.StrictMode>
		<div className="application-wrapper">
		<App />
		</div>
		<div className="mobile-wrapper">
			<div className="center-content">
				<h3 className="logo">Instabook</h3>
				<p>Please open in desktop version to access the application.</p>
			</div>
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
