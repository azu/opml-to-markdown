/**
 * Created by azu on 2014/04/13.
 * LICENSE : MIT
 */
"use strict";
module.exports = function (root) {
    function buildOutline(root) {
        var br = "\n";
        var buildNode = {
            text: function text(node, parent) {
                if (node.depth === 0) {
                    /*
                    --

                    # Header
                     */
                    return br + "--" + br + br + "# " + node.text + br;
                }
                return new Array((node.depth - 1) * 5).join(" ") + "- " + node.text;
            },
            note: function note(node, parent) {
                var prev = parent[parent.indexOf(node)];
                if (prev && prev.depth === 0) {
                    return node.note;
                } else {
                    return br + node.note;
                }
            }
        };


        return root.children.map(function (node, index, array) {
            var oneline = [];
            if (node.hasText()) {
                oneline.push(buildNode.text(node, array));
            }
            if (node.hasNote()) {
                oneline.push(buildNode.note(node, array));
            }
            if (node.hasChildren()) {
                oneline.push(buildOutline(node));
            }
            return oneline.join(br);
        }).join(br);
    }

    var titleHeader = "title: " + root.title;
    return titleHeader + buildOutline(root).replace(/\\n/g, "\n");
};
