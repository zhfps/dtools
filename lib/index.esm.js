/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * 转换实现方法
 * @param parents
 * @param children
 */
var translator = function (key, parentKey, parents, children) {
    //遍历父节点数据
    parents.forEach(function (parent) {
        //遍历子节点数据
        children.forEach(function (current, index) {
            //此时找到父节点对应的一个子节点
            if (current[parentKey] === parent[key]) {
                //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的可以先去了解下深复制
                var temp = JSON.parse(JSON.stringify(children));
                //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                temp.splice(index, 1);
                //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                translator(key, parentKey, [current], temp);
                //把找到子节点放入父节点的children属性中
                typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current];
            }
        });
    });
};
/**
 * list转成树形结构
 * @param key 唯一标识
 * @param parentKey 父节点标识
 * @param list 列表
 * @param tree 结果数
 */
var listToTree = function (key, parentKey, list) {
    //没有父节点的数据
    var parents = list.filter(function (value) { return value[parentKey] == 'undefined' || value[parentKey] == null || value[parentKey] == 0; });
    parents = JSON.parse(JSON.stringify(parents));
    //有父节点的数据
    var children = list.filter(function (value) { return value[parentKey] !== 'undefined' && value[parentKey] != null && value[parentKey] != 0; });
    children = JSON.parse(JSON.stringify(children));
    //调用转换方法
    translator(key, parentKey, parents, children);
    //返回最终的结果
    return parents;
};
var parseTree = function (trees, list) {
    trees.map(function (item) {
        var _item = __assign(__assign({}, item), { children: null });
        delete _item['children'];
        list.push(_item);
        if (item.children && item.children.length > 0) {
            parseTree(item.children, list);
        }
    });
};
/**
 * 树型数组,转数组
 * @param trees
 * @param list
 */
var treeToList = function (trees, list) {
    if (list === void 0) { list = []; }
    parseTree(trees, list);
    return list;
};
var findItem = function (key, value, tree, node) {
    tree.map(function (item) {
        if (item[key] == value) {
            Object.assign(node, item);
        }
        else if (item.children && item.children.length > 0) {
            findItem(key, value, item.children, node);
        }
    });
};
/**
 * 查找数的节点
 * @param key
 * @param tree
 * @param result
 */
var findNode = function (key, value, tree) {
    var node = {
        id: -1,
        parentId: 0,
        children: []
    };
    findItem(key, value, tree, node);
    return node;
};

export { findNode, listToTree, treeToList };
