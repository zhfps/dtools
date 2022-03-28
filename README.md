# dtools

1. 一维数组转树形数组listToTree = (key: string, parentKey: string, list: Array<any>):Array<TNode>

```ts
const list = [
    {
    id: 1,
    parentId: 0,
    name: 'a'
    },{
    id: 2,
    parentId: 1,
    name: 'a'
    }, {
    id: 3,
    parentId: 2,
    name: 'a'
    },{
    id: 4,
    parentId: 3,
    name: 'a'
    },{
    id: 5,
    parentId: 4,
    name: 'a'
    }, {
    id: 6,
    parentId: 5,
    name: 'a'
    },{
    id: 7,
    parentId: 6,
    name: 'a'
    },{
    id: 8,
    parentId: 0,
    name: 'a'
    }, {
    id: 9,
    parentId: 8,
    name: 'a'
    },{
    id: 10,
    parentId: 9,
    name: 'a'
    },{
    id: 11,
    parentId: 10,
    name: 'a'
    }, {
    id: 12,
    parentId: 11,
    name: 'a'
    },{
    id: 13,
    parentId: 12,
    name: 'a'
    },{
    id: 14,
    parentId: 14,
    name: 'a'
    }, {
    id: 15,
    parentId: 14,
    name: 'a'
    }
]


const tree = listToTree('id','parentId',list)
```

```json
[
    {
        "id":1,
        "parentId":0,
        "name":"a",
        "children":[
            {
                "id":2,
                "parentId":1,
                "name":"a",
                "children":[
                    {
                        "id":3,
                        "parentId":2,
                        "name":"a",
                        "children":[
                            {
                                "id":4,
                                "parentId":3,
                                "name":"a",
                                "children":[
                                    {
                                        "id":5,
                                        "parentId":4,
                                        "name":"a",
                                        "children":[
                                            {
                                                "id":6,
                                                "parentId":5,
                                                "name":"a",
                                                "children":[
                                                    {
                                                        "id":7,
                                                        "parentId":6,
                                                        "name":"a"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id":8,
        "parentId":0,
        "name":"a",
        "children":[
            {
                "id":9,
                "parentId":8,
                "name":"a",
                "children":[
                    {
                        "id":10,
                        "parentId":9,
                        "name":"a",
                        "children":[
                            {
                                "id":11,
                                "parentId":10,
                                "name":"a",
                                "children":[
                                    {
                                        "id":12,
                                        "parentId":11,
                                        "name":"a",
                                        "children":[
                                            {
                                                "id":13,
                                                "parentId":12,
                                                "name":"a"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
```
