// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
  let final = [];

  let recurse = (element) => {
    if (element === undefined) return;
    if (element.classList !== undefined && element.classList.contains(className)) {
      final.push(element);
    }
    if (element.childNodes.length) {
      for(let node of element.childNodes) {
        recurse(node);
      }
    }
  };

  recurse(document.body);

  return final;

};
