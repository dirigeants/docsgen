const ava = require('ava');
const data = require('./assets/docs.json');

const typedefs = new Map(data.typedefs.map(type => [type.name, type]));

const SomeThing = typedefs.get('SomeThing');

ava('Typedef', test => {
	test.plan(3);

	test.is(SomeThing.description, 'Just some thing');
	test.deepEqual(SomeThing.type, [[['Object']]]);
	test.deepEqual(SomeThing.props, [{ name: 'someNumber', description: 'A really cool number', type: [[['number']]] }]);
});
