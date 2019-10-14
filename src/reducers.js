
import {
	NAVIGATE_URL
} from "./actions";

const init = {
	url: null
};

function rootReducer(state = init, action) {
	switch (action.type) {
		case NAVIGATE_URL: {
			return {
				...state,
				url: action.url
			};
		}

		default:{
			return state;
		}
	}
}

export default rootReducer;
