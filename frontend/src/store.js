import { configureStore } from '@reduxjs/toolkit';

import skillsReducer from './Reducer/skills';
import adminReducer from './Reducer/admin';

const store = configureStore({
	reducer : {
		skills : skillsReducer,
		admin : adminReducer
	}
});

export default store;