const ava = require('ava');
const { readFile } = require('fs-nextra');
const { custom } = require('./assets/docs.json');


ava('MD', async test => {
	test.plan(4);

	test.is(custom.General.files.Leaving.name, 'You leaving WHY!!');
	test.is(custom.General.files.Leaving.content, await readFile(`./${custom.General.files.Leaving.path}`, 'utf8'));

	test.is(custom.General.files.Welcome.name, 'Welcome There');
	test.is(custom.General.files.Welcome.content, await readFile(`./${custom.General.files.Welcome.path}`, 'utf8'));
});

ava('JS', async test => {
	test.plan(2);

	test.is(custom.Examples.files.ao.name, 'Ao is awesome?');
	test.is(custom.Examples.files.ao.content, await readFile(`./${custom.Examples.files.ao.path}`, 'utf8'));
});
