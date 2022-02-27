const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const client = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(client.connection.host);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
