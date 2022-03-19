let TEMP_BACKEND = '';
if (process.env.NODE_ENV === 'production') {
	TEMP_BACKEND = 'http://www.hashtap.me/api';
} else {
	TEMP_BACKEND = 'http://www.localhost:3001/api';
}

export const BACKEND = TEMP_BACKEND;
