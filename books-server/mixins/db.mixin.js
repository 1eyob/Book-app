"use strict";

const fs = require("fs");
const DbService = require("moleculer-db");

module.exports = function (collection) {
	const schema = {
		mixins: [DbService],

		async started() {
			if (this.seedBooksDB) {
				const count = await this.adapter.count();
				if (count == 0) {
					this.logger.info(
						`The '${collection}' collection is empty. Seeding to the book collection...`
					);
					await this.seedBooksDB();
					this.logger.info(
						"Seeding is done. Number of records:",
						await this.adapter.count()
					);
				}
			}
		},
	};
	process.env.MONGO_URI =
		"mongodb+srv://admin:root@cluster0.je5mfvf.mongodb.net/";

	if (process.env.MONGO_URI) {
		const MongoAdapter = require("moleculer-db-adapter-mongo");

		schema.adapter = new MongoAdapter(
			process.env.MONGO_URI ||
				"mongodb+srv://admin:root@cluster0.je5mfvf.mongodb.net/",
			{ useUnifiedTopology: true }
		);
		schema.collection = collection;
	} else if (process.env.NODE_ENV === "test") {
		schema.adapter = new DbService.MemoryAdapter();
	} else {
		if (!fs.existsSync("./data")) {
			fs.mkdirSync("./data");
		}

		schema.adapter = new DbService.MemoryAdapter({
			filename: `./data/${collection}.db`,
		});
	}

	return schema;
};
