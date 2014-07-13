/**
 * Created by azu on 2014/04/13.
 * LICENSE : MIT
 */
"use strict";
var pather = require("path");
var opmlToJSON = require("opml-to-json");
var own = Object.prototype.hasOwnProperty;
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function (property) {
        Object.defineProperty(receiver, property, Object.getOwnPropertyDescriptor(supplier, property));
    });
}
var accessNode = {
    isNote: function () {
        return own.call(this, "_note");
    },
    isText: function () {
        return own.call(this, "text");
    },
    hasChildren: function () {
        return own.call(this, "children") && this.children.length > 0;
    }
};
var getNode = {
    get note() {
        return this["_note"];
    }
};
function analyzeDepth(root, depth) {
    root.children.forEach(function (node) {
        Object.defineProperty(node, "depth", {
            value: depth,
            enumerable: false
        });
        mixin(node, accessNode);
        mixin(node, getNode);
        if (node.hasChildren()) {
            analyzeDepth(node, depth + 1);
        }
    });
}

function jsonToMarkdown(json, options) {
    analyzeDepth(json, 0);
    if (options.require) {
        return require(pather.resolve(process.cwd(), options.require))(json);
    } else {
        return require("./build-slide-markdown")(json);
    }
}
module.exports = function (xml, options, callback) {
    opmlToJSON(xml, function (error, json) {
        if (error) {
            return callback(error, null);
        }
        callback(null, jsonToMarkdown(json, options));
    });
};