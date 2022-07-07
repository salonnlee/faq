// CommonJS
let { stat, exists, readfile } = require("fs");

// =>
let _fs = require("fs");
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
