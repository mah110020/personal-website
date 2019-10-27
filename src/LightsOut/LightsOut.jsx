import React from "react";
import {Tabs, Tab} from "../Tabs/Tabs.jsx";
import "./LightsOut.scss";

const lightsOutHTML = `${process.env.PUBLIC_URL}/LightsOut.html`;
const lightsOutCSS = `${process.env.PUBLIC_URL}/LightsOut.css`;

class LightsOut extends React.Component {
	render() {
		return (
			<div className="lights-out">
				<Tabs>
					<Tab key="experiment" header="Lights Out!">
						<iframe
							title="Lights Out!"
							src={lightsOutHTML}
						/>
					</Tab>
					<Tab key="discussion" header="Discussion">
						<div className="discussion-tab">
							<div className="text-column">
								<p>
									This is an implementation of the game
									{" "}
									<span style={{fontStyle:"italic"}}>Lights&nbsp;Out!</span>
									{" "}
									intentionally built using only html and CSS.
								</p>
								<p>
									No JavaScript is used. To prove this to you,
									I have deliberately refrained from using JSX
									or a CSS pre-processer, so that I may most easily
									provide for your verification
									{" "}
									<a href={lightsOutHTML}>LightsOut.html</a>
									{" "}
									and
									{" "}
									<a href={lightsOutCSS}>LightsOut.css</a>
									. These are instead mounted in this application
									using an iframe. You can view the page source
									of those documents.
								</p>
								<p>
									State is controlled using hidden checkboxes.
									User interaction changes checkbox state using
									labels, and CSS selectors can determine how that state
									translates back to visible representation.
								</p>
								<p>
									The game begins in an initial
									color configuration. Each time you click a
									cell, the cell and its four adjacent cells
									change colors. The objective of the game is
									to make all the squares turn black. Afterwards
									a message will appear congratulating the
									player. But beware, this game can be difficult!
								</p>
							</div>
						</div>
					</Tab>
				</Tabs>

			</div>
		);
	}
}

export default LightsOut;
