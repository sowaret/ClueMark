export default (...classes) =>
	classes
		.reduce(
			(list, _class) => [
				...list,
				...(_class ? (Array.isArray(_class) ? _class : [_class]) : ''),
			],
			[]
		)
		.join(' ');
