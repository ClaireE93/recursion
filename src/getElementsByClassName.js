// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
    let final = [];

    if (document.body.className === className) final.push(document.body);
    let nodes = document.body.childNodes;
    let recurse = (element) => {
        //console.log(element);
        if (element === undefined) return;
        if (element.classList === undefined) {

        } else if (element.classList.contains(className)) {
            final.push(element);
        }
        if (element.childNodes.length > 0) {
            for (let i = 0; i < element.childNodes.length; i++) {
                recurse(element.childNodes[i]);
            }
        }

    };

    for (let i = 0; i < nodes.length; i++) {
        //console.log('Going into: ' + nodes[i]);
        recurse(nodes[i]);
    }

    return final;

};
