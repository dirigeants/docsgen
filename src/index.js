#!/usr/bin/env node
const fs = require('fs-nextra');
const jsdoc = require('jsdoc-to-markdown');
const { join, dirname, basename, extname, relative } = require('path');
const config = require('./cli');
const Documentation = require('./documentation');

class Main {

	constructor() {
		this.custom = null;
		this.fileCount = 0;
		this.categoryCount = 0;
	}

	async run() {
		if (config.logging) console.log(`Running doc gen with config: `, config);

		console.log(`Currently parsing JSDoc in all source directories`);
		const data = await this.loadFilesData(config.source.reduce((files, dir) => files.concat([`${dir}/*.js`, `${dir}/**/*.js`]), []));

		if (config.custom) {
			console.log(`Loading all custom documentation files...`);
			await this.loadCustomDocs(dirname(config.custom));
		}

		console.log(`Serializing documentation with format version ${Documentation.FORMAT_VERSION}...`);
		const output = JSON.stringify(new Documentation(data, this.custom || undefined), null, config.spaces);

		if (config.output) {
			console.log(`Writing to ${config.output}...`);
			await fs.writeFile(config.output, output);
		}

		console.log('Done!');
		process.exit(0);
	}

	async loadFilesData(files) {
		const data = await jsdoc.getTemplateData({ files, configure: config.jsdoc });
		console.log(`${data.length} JSDoc file${data.length !== 1 ? 's' : ''} have been parsed.`);
		return data;
	}

	async loadCustomDocs(customDir) {
		this.custom = {};
		const definitions = await fs.readJSON(config.custom);
		await Promise.all(definitions.map((cat) => this.parseCategory(customDir, cat)));
		console.log(`${this.fileCount} custom docs file${this.fileCount !== 1 ? 's' : ''} in ${this.categoryCount} categor${this.categoryCount !== 1 ? 'ies' : 'y'} loaded.`);
	}

	parseCategory(customDir, category) {
		const name = category.name.toLowerCase();
		const dir = join(customDir, category.path || name);
		this.custom[name] = { name, files: {} };
		this.categoryCount++;
		return Promise.all(category.files.map(file => {
			const extension = extname(file.path);
			return this.readFile(name, join(dir, file.path), extension.toLowerCase().replace(/^\./, ''), file.name || basename(file.path, extension));
		}));
	}

	async readFile(categoryName, fileRootPath, type, name) {
		const content = await fs.readFile(fileRootPath, 'utf-8');
		const path = relative(config.root, fileRootPath).replace(/\\/g, '/');

		if (config.verbose) console.log(`Loaded custom docs file ${categoryName}/${name}`);

		this.custom[categoryName].files[name] = { name, type, content, path };
		this.fileCount++;
	}

}

new Main().run().catch(err => {
	console.error(err);
	process.exit(1);
});
