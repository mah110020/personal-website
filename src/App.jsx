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

		if( url === null ){
			// initializing..
			return {
				hasNav: false,
				component: null
			};
		} else if( url === "/" ){
			// home page
			return {
				hasNav: false,
				component: <Parallax />
			};
		} else if( url === "/about" ){
			// about page
			return {
				hasNav: true,
				component: <AboutMe />
			};
		} else if( url === "/experiments" || url.startsWith("/experiments/") ){
			// experiments page
			return {
				hasNav: true,
				component: <Experiments />
			};
		} else {
			// no defined route
			return {
				hasNav: false,
				component: <PageNotFound />
			};
		}

	};

	render() {
		const {hasNav, component} = this.router(this.props.url);
		return (
			<div className="app">
				<div className="static-flex">
					{hasNav && <Navbar/>}
				</div>
				<div className="dynamic-flex">
					{component}
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
