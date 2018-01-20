const { EventEmitter } = require('events');

/**
 * A very classy class of Kyra
 * @extends EventEmitter
 */
class ClassyKyra extends EventEmitter {

	/**
	 * Constructs a thing.
	 * @param {string|Object} item An item
	 */
	constructor(item) {
		super();

		/**
		 * Just some thing
		 * @type {?number}
		 */
		this.thing = 42;
		/**
		 * Just an item for testing tbh
		 * @type {?(string|Object)}
		 */
		this.item = item;
		/**
		 * Is Kyra classy?
		 * @type {?Boolean}
		 */
		this.classy = true;
		/**
		 * Is Kyra cool?
		 * @type {?Boolean}
		 */
		this.cool = true;
	}

	/**
	 * Does stuff.
	 * @param {?string} stuff Stuff to do
	 * @returns {?number} A thing
	 */
	doStuff(stuff) {
		console.log(`Doing some pretty crazy stuff with ${stuff}`);
		return this.thing;
	}

	/**
	 * Who knows what this does.
	 * @emits ClassyKyra#thingDone
	 */
	hmm() {
		console.log('Hmmmm..');

		/**
		 * Emitted when a thing is done
		 * @event ClassyKyra#thingDone
		 * @param {SomeThing} thingy Thing
		 */
		this.emit('thingDone', 4242424242);
	}
	/**
	 * @static
	 * @readonly
	 * @type {string}
	 * @returns {string}
	 */
	static get mmLul() {
		return 'memez';
	}
	/**
	 * @readonly
	 * @type {string}
	 * @returns {string}
	 */
	get mmLel() {
		return 'Extra memey';
	}

}

/**
 * Just some thing
 * @typedef {Object} SomeThing
 * @property {number} someNumber A really cool number
 */

module.exports = ClassyKyra;
