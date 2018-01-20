const yargs = require('yargs');
const { version, homepage } = require('../package.json');

module.exports = yargs
	.usage('$0 [command] [options]')
	.epilogue(`klasa-docgen v${version} by Jacz: ${homepage}`)

	.option('source', {
		type: 'array',
		alias: ['s', 'i'],
		describe: 'Source directories to parse JSDocs in',
		demand: true,
		normalize: true
	})
	.option('custom', {
		type: 'string',
		alias: 'c',
		describe: 'Custom docs definition file to use',
		normalize: true
	})
	.option('root', {
		type: 'string',
		alias: 'r',
		describe: 'Root directory of the project',
		normalize: true,
		default: '.'
	})
	.option('output', {
		type: 'string',
		alias: 'o',
		describe: 'Path to output file',
		normalize: true
	})
	.option('jsdoc', {
		type: 'string',
		alias: 'j',
		describe: 'Path to JSDoc config file',
		normalize: true
	})
	.option('logging', {
		type: 'boolean',
		alias: 'log',
		describe: 'Logs extra information to the console',
		default: false
	})
	.option('config', {
		type: 'string',
		alias: 'C',
		describe: 'Path to JSON config file',
		group: 'Special:',
		normalize: true,
		config: true,
		configParser: configFile => require(configFile)
	})
	.option('spaces', {
		type: 'number',
		describe: 'Number of spaces to indent docs.json file',
		default: 0
	})

	.help()
	.group('help', 'Special:')
	.version(version)
	.alias('version', 'v')
	.group('version', 'Special:')
	.completion('completion')
	.wrap(yargs.terminalWidth())
	.argv;
