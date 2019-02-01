# dirigeants-docgen
A documentation generator for JavaScript applications, used to generate [Klasa's documentation](https://klasa.js.org).

## Usage
```
$ dg
index.js [command] [options]

Commands:
  index.js completion  generate bash completion script

Special:
  --config, -C   Path to JSON config file  [string]
  --help         Show help  [boolean]
  --version, -v  Show version number  [boolean]

Options:
  --source, -s, -i  Source directories to parse JSDocs in  [array] [required]
  --custom, -c      Custom docs definition file to use  [string]
  --root, -r        Root directory of the project  [string] [default: "."]
  --output, -o      Path to output file  [string]
  --jsdoc, -j       Path to JSDoc config file  [string]
  --logging, --log  Logs extra information to the console  [boolean] [default: false]
  --spaces          Number of spaces to indent docs.json file  [number] [default: 0]

klasa-docgen v0.0.1 by Jacz: https://github.com/dirigeants/docsgen#readme

Missing required argument: source
```

### Quick build
`npx dirigeants/docsgen -s <source directory> -o docs.json`
> Note: This *will* try and include your node_modules directory so it's a good idea to keep that source directory in another folder (like `src` or `source`.)

## All Credits for the original code
- [Amish Shah (Hydrabolt)](https://github.com/hydrabolt)
- [Schuyler Cebulskie (Gawdl3y)](https://github.com/Gawdl3y)

The original code is based on [**Discord.js Doc-gen**](https://github.com/discordjs/docgen).
