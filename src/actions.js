/*
 * action types
 */

export const NAVIGATE_URL = "NAVIGATE_URL";

/*
 * action creators
 */

export function navigateURL(url, push=true) {
	if(push && document.location.pathname !== url){
		window.history.pushState(null, null, url);
	}
	return { type: NAVIGATE_URL, url };
}
