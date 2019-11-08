const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const hashFilePath = path.join(__dirname, "./accessKeyHashes.json");

const hashedRecords = () => {
	let records = null;

	try {
		// [{ userId, hash, salt, len, N, r, p }, ... ]
		records = JSON.parse(fs.readFileSync(hashFilePath, {encoding: "utf8"}));
	} catch (err) {
		records = [];
	}

	return records;
};

// comments quoted from node.js crypto.scryptSync documentation
// https://nodejs.org/api/crypto.html#crypto_crypto_scryptsync_password_salt_keylen_options
const hashKey = (key, salt, len, N, r, p) => {

	// Memory upper bound. It is an error when (approximately) 128 * N * r > maxmem.
	const maxmem = 32 * 1024 * 1024;

	const hash = crypto.scryptSync(key, salt, len, { N, r, p, maxmem }).toString("hex");

	return { hash, salt, len, N, r, p };
};

const authenticate = key => {

	const hashes = hashedRecords();

	// the key has the form: `<id>.<secret>`
	// though we always treat the entire key as the secret
	const [userId, hashableSecret] = `.${key}`.split`.`.slice(-2);

	const candidate = hashes.find( record => record.userId === userId );
	
	if( !candidate ){
		hashKey("", "", 64, 16384, 8, 1); // make the API timings consistent
		return false;
	}

	const {hash: candidateHash} = hashKey(
		hashableSecret,
		candidate.salt,
		candidate.len,
		candidate.N,
		candidate.r,
		candidate.p
	);

	const sameHash = candidate.hash === candidateHash;

	// return True or False
	return sameHash;
};

module.exports = {
	authenticate,
	hashedRecords,
	hashKey
};
