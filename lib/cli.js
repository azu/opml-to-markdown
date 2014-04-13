"use strict";
var fs = require("fs");
var pather = require("path");
module.exports = function (argv) {
    var optionator = require('optionator')({
        prepend: 'Usage: cmd [options]',
        append: 'Version 1.0.0',
        options: [
            {
                option: 'help',
                alias: 'h',
                type: 'Boolean',
                description: 'displays help'
            },
            {
                option: 'entry',
                alias: 'e',
                type: 'String',
                description: 'opml file path',
                example: 'inlining --e target.opml'
            },
            {
                option: 'outfile',
                alias: 'o',
                type: 'String',
                description: 'output to file path',
                example: 'inlining --e target.opml -o out.md'
            },
            {
                option: 'require',
                type: 'String',
                description: 'builder module(like build-markdown.js) path',
                example: 'inlining --require module/own-markdown.js -o out.md'
            }
        ]
    });
    var currentOptions;
    try {
        currentOptions = optionator.parse(argv);
    } catch (error) {
        console.error(error.message);
        return 1;
    }
    if (currentOptions.version) { // version from package.json
        console.log("v" + require("../package.json").version);
    } else if (currentOptions.help) {
        console.log(optionator.generateHelp());
    } else if (currentOptions.entry || currentOptions._.length > 0) {
        var entryPath = currentOptions.entry || currentOptions._[0];
        var opmlToMD = require("./opml-to-markdown");
        var opmlContent = fs.readFileSync(pather.resolve(process.cwd(), entryPath), "utf-8");
        opmlToMD(opmlContent, currentOptions, function (error, markdown) {
            if (currentOptions.outfile) {
                var output = currentOptions.outfile;
                fs.writeFileSync(pather.basename(output), markdown, "utf-8");
            } else {
                console.log(markdown);
            }
        });
    }
};