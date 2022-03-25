// remove html tags

//debounce function

//dfs
// let arr = []; 
// function climbTree(obj) { 
//   arr.unshift(obj.id); 
//   if (obj.parent) { 
//     climbTree(obj.parent); 
//   } 
// } 

// const createTree = (obj, parent = {}, targetId = null) => { 
//     console.log("Aa", parent);
//   // obj.parent = parent?.id; 
//   if (targetId === obj.id) { 
//     return climbTree(obj); 
//   } 
//   console.log(obj);
//   for (let node of obj?.items) {
//     console.log(node, obj, targetId); 
//     createTree(node, obj, targetId); 
//   }
//   // console.log(arr);
//   // const idAdjacent = arr.length > 1 ? arr[arr.length - 2] : arr?.[0]
//   return arr[arr.length - 2] || arr?.[0]
// } 
// console.log(arr.join("-"));


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
  return arr[arr.length - 2] || arr?.[0];
}

export default createTree;