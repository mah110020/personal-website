import React from "react";
import { connect } from "react-redux";
import { navigateURL } from "./actions";
import Parallax from "./Parallax/Parallax.jsx";
import "./App.scss";
import "./iconLibrary.js";

class App extends React.Component {
	componentDidMount(){
		// initial url
		const url = document.location.pathname;
		this.props.navigateURL(url);
	}

	render() {
		return (
			<div className="app">
				<Parallax />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	url: state.url
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	navigateURL: url => dispatch(navigateURL(url))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
