const { events } = require('./data.json');

export default (req, res) => {
	const motto = events.filter((mot) => mot.motto === req.query.motto);

	if (req.method === 'GET') {
		res.status(200).json(motto);
	} else {
		res.setHeader('Allow', [ 'GET' ]);
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
};
