export interface TNode {
    id:string|number,
    parentId: string|number,
    [key:string]: any,
    children: TNode[]
}

/**
 * 转换实现方法
 * @param parents
 * @param children
 */
const translator = (key: string, parentKey: string, parents:Array<any>, children:Array<any>) => {
    //遍历父节点数据
    parents.forEach((parent) => {
            //遍历子节点数据
            children.forEach((current, index) => {
                    //此时找到父节点对应的一个子节点
                    if (current[parentKey] === parent[key]) {
                        //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的可以先去了解下深复制
                        let temp = JSON.parse(JSON.stringify(children))
                        //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                        temp.splice(index, 1)
                        //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                        translator(key,parentKey,[current], temp)
                        //把找到子节点放入父节点的children属性中
                        typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                    }
                }
            )
        }
    )
}
/**
 * list转成树形结构
 * @param key 唯一标识
 * @param parentKey 父节点标识
 * @param list 列表
 * @param tree 结果数
 */
const listToTree = (key: string, parentKey: string, list: Array<any>):Array<TNode> =>{
    //没有父节点的数据
    let parents = list.filter(value => value[parentKey] == 'undefined' || value[parentKey] == null || value[parentKey] == 0)
    parents = JSON.parse(JSON.stringify(parents))
    //有父节点的数据
    let children = list.filter(value => value[parentKey] !== 'undefined' && value[parentKey] != null && value[parentKey] != 0)
    children = JSON.parse(JSON.stringify(children))
    //调用转换方法
    translator(key, parentKey, parents, children)
    //返回最终的结果
    return parents
}

const parseTree = (trees: Array<TNode>, list:Array<any>) =>{
    trees.map(item =>{
        const _item: { [key:string]: any } = {...item, children: null }
        delete _item['children']
        list.push(_item)
        if(item.children && item.children.length>0){
            parseTree(item.children,list)
        }
    })
}
/**
 * 树型数组,转数组
 * @param trees
 * @param list
 */
const treeToList = (trees: Array<TNode>, list:Array<any> = []): Array<any> => {
    parseTree(trees,list)
    return list;
}
/**
 * 查找数的节点
 * @param key
 * @param tree
 * @param result
 */
const findNode = (key: string,tree: Array<TNode>, result: Array<TNode> = []):Array<TNode> =>{
    return  result
}

export {
    listToTree,
    translator,
    parseTree,
    treeToList
}
