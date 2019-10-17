import React from "react";
import { connect } from "react-redux";
import { navigateURL } from "./actions.js";
import Navbar from "./Navbar/Navbar.jsx";
import Parallax from "./Parallax/Parallax.jsx";
import AboutMe from "./AboutMe/AboutMe.jsx";
import Experiments from "./Experiments/Experiments.jsx";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import "./App.scss";
import "./iconLibrary.js";

class App extends React.Component {
	componentDidMount(){
		// initial url
		const url = document.location.pathname;
		this.props.navigateURL(url);

		window.onpopstate = evt => {
			this.props.navigateURL(document.location.pathname, false);
		};
	}

	router = url => {
		switch(url){

			// home page
			case "/": {
				return <Parallax />;
			}

			// about page
			case "/about": {
				return <AboutMe />;
			}

			// experiments page
			case "/experiments": {
				return <Experiments />;
			}

			// initializing..
			case null: {
				return null;
			}

			// no defined route
			default: {
				return <PageNotFound />;
			}
		}
	};

	render() {
		return (
			<div className="app">
				<div className="static-flex">
					{ ["/about", "/experiments"].includes(this.props.url) && <Navbar/>}
				</div>
				<div className="dynamic-flex">
					{this.router(this.props.url)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	url: state.url
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	navigateURL: (url, push) => dispatch(navigateURL(url, push))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
