"use strict";
const _ = require("lodash");
const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		// Exposed port
		port: process.env.PORT || 3000,

		// Exposed IP
		ip: "0.0.0.0",

		use: [],

		routes: [
			{
				path: "/api",

				whitelist: ["**"],

				use: [],

				mergeParams: true,

				autoAliases: true,

				aliases: {
					aliases: {
						"REST /books": "books",

						"POST /create": "books.create",
						"GET /getAll": "books.getAll",
						"GET /book/:id": "books.getBook",
						"PUT /book/:id": "books.updateBook",
						"DELETE /book/:id": "books.deleteBook",
					},
				},
				cors: true,

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},

				mappingPolicy: "all",

				logging: true,
			},
		],

		assets: {
			folder: "public",

			options: {},
		},
		onError(req, res, err) {
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				let o = {};
				err.data.forEach((e) => {
					let field = e.field.split(".").pop();
					o[field] = e.message;
				});

				res.end(JSON.stringify({ errors: o }, null, 2));
			} else {
				const errObj = _.pick(err, [
					"name",
					"message",
					"code",
					"type",
					"data",
				]);
				res.end(JSON.stringify(errObj, null, 2));
			}
			this.logResponse(req, res, err ? err.ctx : null);
		},
	},
};
