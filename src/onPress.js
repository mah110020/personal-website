
// provide easy way to bind callback to check for keys & clicks
// e.g. <button {...onPress( ()=>{console.log("Hello")} )} />

const isPressed = (cb, evt) => {
	const isEnter = evt.keyCode === 13;
	const isSpace = evt.keyCode === 32;
	const isClick = evt.type === "click";
	if( isEnter || isSpace || isClick ){
		cb();
	}
}

const onPress = cb => {
	const fn = isPressed.bind(null, cb);
	return {
		onClick: fn,
		onKeyPress: fn
	};
};

export default onPress;
