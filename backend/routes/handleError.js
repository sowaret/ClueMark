export default (res, caughtError) => {
	let json = { error: caughtError.toString() };

	// If thrown as enum
	const { code, ...errorEnum } = caughtError;
	if (errorEnum.error) json = errorEnum;
	else console.error(caughtError);

	return res.status(code || 500).json(json);
};
