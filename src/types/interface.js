const DocumentedClass = require('./class');

class DocumentedInterface extends DocumentedClass {

	serializer() {
		const serialized = super.serializer();
		serialized.description = this.directData.classdesc;
		serialized.interface = true;
		return serialized;
	}

}

/*
{ id: 'TextBasedChannel',
  longname: 'TextBasedChannel',
  name: 'TextBasedChannel',
  scope: 'global',
  kind: 'interface',
  classdesc: 'Interface for classes that have text-channel-like features',
  params: [],
  meta:
   { lineno: 5,
     filename: 'TextBasedChannel.js',
     path: 'src/structures/interface' },
  order: 175 }
*/

module.exports = DocumentedInterface;
