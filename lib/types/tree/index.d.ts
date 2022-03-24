export interface TNode {
    id: string | number;
    parentId: string | number;
    [key: string]: any;
    children: TNode[];
}
/**
 * 转换实现方法
 * @param parents
 * @param children
 */
declare const translator: (key: string, parentKey: string, parents: Array<any>, children: Array<any>) => void;
/**
 * list转成树形结构
 * @param key 唯一标识
 * @param parentKey 父节点标识
 * @param list 列表
 * @param tree 结果数
 */
declare const listToTree: (key: string, parentKey: string, list: Array<any>) => Array<TNode>;
export { listToTree, translator };
