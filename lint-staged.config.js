module.exports = {
	'*.{ts,tsx}': ['yarn eslint:fix', () => 'yarn tslint'],
	'*': 'yarn prettier:write',
};
