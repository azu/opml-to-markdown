"use strict";
var assert = require("power-assert");
var fs = require("fs");
var opmlToMD = require("../lib/opml-to-markdown");
describe("opml-to-json", function () {
    it("should return markdown", function (done) {
        var xml = fs.readFileSync(__dirname + "/fixtures/header-list-note/test.opml", "utf-8");
        var expected = fs.readFileSync(__dirname + "/fixtures/header-list-note/result.md", "utf-8");
        opmlToMD(xml, {}, function (error, markdown) {
            assert.equal(markdown, expected);
            done();
        });
    });
    context("when note only", function () {
        it("should return markdown", function (done) {
            var xml = fs.readFileSync(__dirname + "/fixtures/header-note/test.opml", "utf-8");
            var expected = fs.readFileSync(__dirname + "/fixtures/header-note/result.md", "utf-8");
            opmlToMD(xml, {}, function (error, markdown) {
                assert.equal(markdown, expected);
                done();
            });
        });

    });
});

