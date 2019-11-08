const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const {hashedRecords, hashKey} = require("../authenticate.js");

const generateAvailableId = () => {
	const ids = new Set(
		hashedRecords()
			.map( record => record.userId )
			.map( userId => parseInt(userId, 36) ) // it's alpha-numeric
	);

	let id = 36;
	while( ids.has(id) ){
		id += 1;
	}

	const numDigits = Math.floor(Math.log(id)/Math.log(36)) + 1;
	const sameLenCeil = (36 ** numDigits) - 1;
	const sameLenFloor = 36 ** (numDigits - 1);

	id = null;
	while( ids.has(id) || id === null ){
		id = sameLenFloor + Math.floor( Math.random() * ( sameLenCeil - sameLenFloor + 1 ) );
	}

	return id.toString(36);
};

const generateRandomKey = () => {
	let key = "";
	while( key.length < 8 ){
		const rand = crypto.randomBytes(1)[0];
		if( rand < 36 ){
			key += rand.toString(36);
		}
	}
	return key;
};

// use for generating new credentials
const generateCredentials = () => {

	const userId = generateAvailableId();
	const key = generateRandomKey(); // [alpha-numeric] 8 digits long;

	const salt = crypto.randomBytes(64).toString("hex");
	const len = 64;

	const N = 16384; // CPU/memory cost parameter. Must be a power of two greater than one.
	const r = 8; // Block size parameter.
	const p = 1; // Parallelization parameter.

	const hashed = hashKey(key, salt, len, N, r, p);

	return {
		token: `${userId}.${key}`,
		record: {
			userId,
			hash: hashed.hash,
			salt,
			len,
			N,
			r,
			p
		}
	};
};

module.exports = {
	generateCredentials
};
