"use strict";

const DbMixin = require("../mixins/db.mixin");

module.exports = {
	name: "books",
	mixins: [DbMixin("books")],

	methods: {
		async seedBooksDB() {
			await this.adapter.insertMany([
				{
					title: "To Kill a Mockingbird",
					author: "Harper Lee",
					ISBN: "978-0-06-112008-4",
					format: "Paperback",
					description:
						"To Kill a Mockingbird is a novel by Harper Lee, published in 1960. It is a classic of modern American literature dealing with themes of racism, morality, and social injustice.",
					genre: "Fiction, Coming-of-Age",
				},
				{
					title: "1984",
					author: "George Orwell",
					ISBN: "978-0-452-28423-4",
					format: "Hardcover",
					description:
						"1984 is a dystopian novel by George Orwell, published in 1949. It explores the dangers of totalitarianism, mass surveillance, and the erosion of individual freedom.",
					genre: "Fiction, Dystopia",
				},
				{
					title: "The Great Gatsby",
					author: "F. Scott Fitzgerald",
					ISBN: "978-0-7432-7356-5",
					format: "E-book",
					description:
						"The Great Gatsby is a novel by F. Scott Fitzgerald, published in 1925. It portrays the decadence and excesses of the Jazz Age in America and the pursuit of the American Dream.",
					genre: "Fiction, Classics",
				},
				{
					title: "Sapiens: A Brief History of Humankind",
					author: "Yuval Noah Harari",
					ISBN: "978-0-06-231611-0",
					format: "Audio Book",
					description:
						"Sapiens: A Brief History of Humankind is a non-fiction book by Yuval Noah Harari, published in 2014. It surveys the history of Homo sapiens from the Stone Age to the twenty-first century.",
					genre: "Non-Fiction, History",
				},
			]);
		},
	},

	async afterConnected() {},
};
