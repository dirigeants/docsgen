const DocumentedItem = require('./item');
const DocumentedItemMeta = require('./item-meta');
const DocumentedVarType = require('./var-type');
const DocumentedParam = require('./param');

class DocumentedFunction extends DocumentedItem {

	registerMetaInfo(data) {
		data.meta = new DocumentedItemMeta(this, data.meta);
		if (data.returns) {
			let returnDescription;
			let returnNullable;
			if (data.returns[0].description) returnDescription = data.returns[0].description;
			if (data.returns[0].nullable) returnNullable = true;
			data.returns = new DocumentedVarType(this, data.returns[0].type);
			data.returns.directData.description = returnDescription;
			data.returns.directData.nullable = returnNullable;
		}
		if (data.yields) {
			let yieldDescription;
			if (data.yields[0].description) yieldDescription = data.yields[0].description;
			data.yields = new DocumentedVarType(this, data.yields[0].type);
			data.yields.directData.description = yieldDescription;
		}
		if (data.params) {
			if (data.params.length > 0) for (let i = 0; i < data.params.length; i++) data.params[i] = new DocumentedParam(this, data.params[i]);
			else data.params = undefined;
		}
		this.directData = data;
	}

	serializer() {
		return {
			name: this.directData.name,
			description: this.directData.description,
			see: this.directData.see,
			scope: this.directData.scope !== 'instance' ? this.directData.scope : undefined,
			access: this.directData.access,
			inherits: this.directData.inherits,
			inherited: this.directData.inherited,
			implements: this.directData.implements,
			examples: this.directData.examples,
			abstract: this.directData.virtual && !this.directData.inherited,
			deprecated: this.directData.deprecated,
			emits: this.directData.fires,
			throws: this.directData.throws,
			params: this.directData.params ? this.directData.params.map(param => param.toJSON()) : undefined,
			returns: this.directData.returns ? this.directData.returns.toJSON() : undefined,
			yields: this.directData.yields ? this.directData.yields.toJSON() : undefined,
			meta: this.directData.meta.toJSON(),
			since: this.directData.since
		};
	}

}

/*
{
  "id":"ClientUser#sendTTSMessage",
  "longname":"ClientUser#sendTTSMessage",
  "name":"sendTTSMessage",
  "scope":"instance",
  "kind":"function",
  "inherits":"User#sendTTSMessage",
  "inherited":true,
  "implements":[
    "TextBasedChannel#sendTTSMessage"
  ],
  "description":"Send a text-to-speech message to this channel",
  "memberof":"ClientUser",
  "params":[
    {
      "type":{
        "names":[
          "String"
        ]
      },
      "description":"the content to send",
      "name":"content"
    }
  ],
  "examples":[
    "// send a TTS message..."
  ],
  "returns":[
    {
      "type":{
        "names":[
          "Promise.<Message>"
        ]
      }
    }
  ],
  "meta":{
    "lineno":38,
    "filename":"TextBasedChannel.js",
    "path":src/structures/interface"
  },
  "order":293
}
*/

module.exports = DocumentedFunction;
