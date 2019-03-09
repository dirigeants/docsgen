const ava = require('ava');
const data = require('./assets/docs.json');

const classes = new Map(data.classes.map(clarse => [clarse.name, clarse]));

const ClassyKyra = classes.get('ClassyKyra');

const props = new Map(ClassyKyra.props.map(prop => [prop.name, prop]));

const thing = props.get('thing');
const item = props.get('item');
const classy = props.get('classy');
const cool = props.get('cool');
const mmLel = props.get('mmLel');
const mmLul = props.get('mmLul');

const methods = new Map(ClassyKyra.methods.map(method => [method.name, method]));

const doStuff = methods.get('doStuff');
const hmm = methods.get('hmm');

const events = new Map(ClassyKyra.events.map(event => [event.name, event]));

const thingDone = events.get('thingDone');

ava('Class', test => {
	test.plan(6);

	test.is(typeof ClassyKyra, 'object');
	test.deepEqual(ClassyKyra.extends, ['EventEmitter']);
	test.is(ClassyKyra.description, 'A very classy class of Kyra');
	test.is(ClassyKyra.construct.name, 'ClassyKyra');
	test.is(ClassyKyra.construct.description, 'Constructs a thing.');
	test.deepEqual(ClassyKyra.construct.params, [{ name: 'item', description: 'An item', type: [[['string']], [['Object']]] }]);
});

ava('Properties', test => {
	test.plan(30);

	test.is(thing.description, 'Just some thing');
	test.is(thing.scope, undefined);
	test.is(thing.readonly, undefined);
	test.is(thing.nullable, true);
	test.deepEqual(thing.type, [[['number']]]);

	test.is(item.description, 'Just an item for testing tbh');
	test.is(item.scope, undefined);
	test.is(item.readonly, undefined);
	test.is(item.nullable, true);
	test.deepEqual(item.type, [[['string']], [['Object']]]);

	test.is(classy.description, 'Is Kyra classy?');
	test.is(classy.scope, undefined);
	test.is(classy.readonly, undefined);
	test.is(classy.nullable, true);
	test.deepEqual(classy.type, [[['Boolean']]]);

	test.is(cool.description, 'Is Kyra cool?');
	test.is(cool.scope, undefined);
	test.is(cool.readonly, undefined);
	test.is(cool.nullable, undefined);
	test.deepEqual(cool.type, [[['Boolean']]]);

	test.is(mmLel.description, undefined);
	test.is(mmLel.scope, undefined);
	test.is(mmLel.readonly, true);
	test.is(mmLel.nullable, undefined);
	test.deepEqual(mmLel.type, [[['string']]]);

	test.is(mmLul.description, undefined);
	test.is(mmLul.scope, 'static');
	test.is(mmLul.readonly, true);
	test.is(mmLul.nullable, undefined);
	test.deepEqual(mmLul.type, [[['string']]]);
});

ava('Methods', test => {
	test.plan(5);

	test.is(doStuff.description, 'Does stuff.');
	test.deepEqual(doStuff.params, [{ name: 'stuff', description: 'Stuff to do', nullable: true, type: [[['string']]] }]);
	test.deepEqual(doStuff.returns, { types: [[['number']]], description: 'A thing', nullable: true });

	test.is(hmm.description, 'Who knows what this does.');
	test.deepEqual(hmm.emits, ['ClassyKyra#event:thingDone']);
});

ava('events', test => {
	test.plan(2);

	test.is(thingDone.description, 'Emitted when a thing is done');
	test.deepEqual(thingDone.params, [{ name: 'thingy', description: 'Thing', type: [[['SomeThing']]] }]);
});
