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

var index = {
    listToTree: listToTree
};

export { index as default };
