// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  const recurse = function recurseElementToParse(el) {
    //First string check
    if (el === 'null') return null;
    if (el === 'true') return true;
    if (el === 'false') return false;

    //All other string check. Slice of extra quotation marks and ignore escape characters.
    if (el[0] === '\"') {
      let final = '';
      for (let i = 1; i < el.length - 1; i++) {
        if (el[i] === '\\') {
          final += el[i + 1];
          i++;
        } else {
          final += el[i];
        }
      }
      return final;
    }

    //Object function
    if (el[0] === '{') {
      return parseObj(el);
    }

    //Array function
    if (el[0] === '[') {
      return parseArr(el);
    }

    //Number check
    if (isNum(el)) {
      return parseFloat(el);
    }

  };

  //Check for negatives, floats, and ints.
  const isNum = function checkIfElIsNumber(el) {
    return /^[0-9]+$/.test(el[0]) || /^[0-9]+$/.test(el[1]);
  };

  const parseObj = function parseObjUsingRecursion(el) {
    let obj = {};
    if (el[1] === '}') return obj;
    let keyValuePairs = getKeyValuePairs(el);
    keyValuePairs.forEach((curPair) => {
      let curKey = getKeyValString(curPair).trim();
      curKey = curKey.slice(1, curKey.length - 1); //Slice off unecessary quotation marks.
      let curVal = getKeyValString(curPair, true).trim();
      obj[curKey] = recurse(curVal);
    });

    return obj;
  };

  const parseArr = function parseArrUsingRecursion(el) {
    let arr = [];
    if (el[1] === ']') return arr;
    let arrEl = getKeyValuePairs(el);
    arrEl.forEach((cur) => {
      arr.push(recurse(cur.trim()));
    });

    return arr;
  };

  //Get split key and value strings from getKeyValuePairs elements using ':' as split point
  const getKeyValString = function getSplitKeyAndValStrings(el, isVal) {
    let str = '';
    let i = 0;
    while (el[i] != ':') {
      str += el[i];
      i++;
    }
    if (isVal) {
      return el.slice(++i, el.length);
    }
    return str;
  };

  const getKeyValuePairs = function getKeyValuePairsInArray(el) {
    let arr = [];
    let isInString = false;
    let str = '';
    let depth = 0;
    for (let i = 1; i < el.length; i++) {

      //el.length check will fail if obj has extra whitespace. This catches the end of the object
      //and cuts off the extra bracket/curly brace that got added when el.length check failed.
      if (depth === -1) {
        str = str.slice(0, str.length - 1);
        arr.push(str);
        break;
      }

      if (isInString) {
        if (el[i] === '\"' && el[i - 1] !== '\\') {
          isInString = false;
        }
        str += el[i];
        continue;
      }

      if (el[i] === '[' || el[i] === '{') {
        depth++;
      } else if ((el[i] === ']' || el[i] === '}') && (i === el.length - 1)) { //Reached end of string
        arr.push(str);
        str = '';
        break;
      } else if (el[i] === ']' || el[i] === '}') {
        depth--;
      } else if (el[i] === '\"') {
        isInString = true;
      } else if (el[i] === ',' && depth === 0) {  //Reached end of key/val pair or arr element.
        arr.push(str);
        str = '';
        continue;
      } else if ((el[i] === '\n' || el[i] === '\r' || el[i] === '\t')) {
        continue;
      }

      str += el[i];

    }

    //Throw error if JSON syntax is wrong
    if (depth === 0 && str.length > 0) {
      throw new SyntaxError();
    }

    return arr;
  };

  //Call function to kick off
  return recurse(json);

};
