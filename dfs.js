let jsonParsed = JSON.parse(`{
    "id":1,
    "name":"A",
    "nodes":[
       {
          "id":2,
          "name":"B",
          "nodes":[
             {
                "id":3,
                "name":"C",
                "nodes":[
                   
                ]
             },
             {
                "id":4,
                "name":"D",
                "nodes":[
                   {
                      "id":5,
                      "name":"E",
                      "nodes":[
                         
                      ]
                   }
                ]
             }
          ]
       }
    ]
 }`);

let arr = [];

function climbTree(obj) {
  arr.unshift(obj.id);

  if (obj.parent) {
    climbTree(obj.parent);
  }
}

function createTree(obj, parent = null, targetId = null) {
  obj.parent = parent;

  if (targetId === obj.id) {
    return climbTree(obj);
  }
console.log("obj", obj);
if (obj?.items) {
  for (let node of obj.items) {
    createTree(node, obj, targetId);
  }
}

  console.log(arr[arr.length - 2] || arr?.[0]);
}

// createTree(jsonParsed, null, 5);
createTree({
   "parent": null,
   "id": "623d91662d6bc208d3b8e62c",
   "type": 'Folder',
   "items": [
       {
           "id": "4c613461-0837-41ae-963b-05aac72eb7e5",
           "name": "Untitled Doc",
           "label": "Untitled Doc",
           "type": "File",
           "parent": "global"
       },
       {
         "id": "4c613461-0837-41ae-963b-05aac72eb7e6",
         "name": "Untitled Doc",
         "label": "Untitled Doc",
         "type": "Folder",
         "parent": "global",
         "items": [
            {
               "id": "4c613461-0837-41ae-963b-05aac72eb7e7",
               "name": "Untitled Doc",
               "label": "Untitled Doc",
               "type": "File",
               "parent": ""
           }
         ]
     }
   ]
}, null, '4c613461-0837-41ae-963b-05aac72eb7e7');

console.log(arr.join("-------"));
