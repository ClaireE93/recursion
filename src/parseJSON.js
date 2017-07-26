// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  let recurse = function(el) {
    //First string check
    if(el === 'null') return null;
    if(el === 'true') return true;
    if(el === 'false') return false;

    //All other string check
    if(el[0] === '\"') {
      let final = '';
      for(let i = 1; i < el.length - 1; i++) {
        if(el[i] === '\\') {
          final += el[i+1];
          i++;
        } else {
          final += el[i];
        }
      }
      return final;
    }

    //Number check
    if(isNum(el)) {
      return parseFloat(el);
    }

    //Object function
    if(el[0] === '{') {
      return parseObj(el);
    }

    //Array function
    if(el[0] === '[') {
      return parseArr(el);
    }

  }

  let isNum = el => {
      let isArr = el[0] === '[' || el[0] === '{';
      let test = /^[0-9]+$/.test(el[1]) || /^-?[0-9]+$/.test(el[0]);;
      return test && !isArr;
    };

  let parseObj = el => {
    let obj = {};
    if(el[1] === '}') return obj;
    let keyValuePairs = getKeyValuePairsArr(el);
    // console.log(keyValuePairs);
    keyValuePairs.forEach(curPair => {
      let curKey = getKeyValueStrings(curPair, 'key');
      curKey = removeWhitespace(curKey);
      curKey = curKey.slice(1, curKey.length - 1);
      let curVal = getKeyValueStrings(curPair, 'val');
      obj[curKey] = recurse(removeWhitespace(curVal));
    });
    return obj;
  };

  let parseArr = el => {
    let arr = [];
    if(el[1] === ']') return arr;
    let arrEl = getKeyValuePairsArr(el);
    arrEl.forEach(cur => {
      arr.push(recurse(removeWhitespace(cur)));
    });

    return arr;
  };

  // split into getKeyString and getValueString
  let getKeyValueStrings = (cur, type) => {
    let str = '';
    let i = 0;
    if (type === 'key') {
      while(cur[i] != ':') {
        str += cur[i];
        i++;
      }
    }

    if (type === 'val') {
      while(cur[i] != ':') {
        i++;
      }
      i++;
      str = cur.slice(i, cur.length);
    }

    return str;
  };

  let getKeyValuePairsArr = el => {
    let arr = [];
    let isInString = false;
    let str = '';
    let depth = 0;
    for(let i = 1; i < el.length; i++) {

      if (depth === -1) {
        str = str.slice(0, str.length - 1);
        arr.push(str);
        break;
      }

      if (isInString) {
        if (el[i] === '\"' && el[i-1] !== '\\') {
          isInString = false;
        }
        str += el[i];
        continue;
      }

      if (el[i] === '[' || el[i] === '{') {
        depth++;
      } else if ( (el[i] === ']' || el[i] === '}') && (i === el.length - 1) ) {
        arr.push(str);
        str = '';
        continue;
      } else if (el[i] === ']' || el[i] === '}') {
        depth--;
      } else if (el[i] === '\"') {
        isInString = true;
      } else if (el[i] === ',' && depth === 0) {
        arr.push(str);
        str = '';
        continue;
      } else if ((el[i] === '\n' || el[i] === '\r' || el[i] === '\t')) {
        continue;
      }

      str += el[i];

      // if(el[i] === '[' || el[i] === '{' || (el[i] === '\"' && !isInside)) {
      //   isInside = true;
      //   depth++;
      // } else if (el[i] === ']' || el[i] === '}' || (el[i] === '\"' && isInside)) {
      //   isInside = false;
      //   depth--;
      // }

      // claire
      // if(el[i] === ',' && depth === 0) {
      //   arr.push(str);
      //   str = '';
      //   continue;
      // }

      // if((el[i] === '}' || el[i] === ']') && i === el.length - 1) {
      //   // console.log(str);
      //   arr.push(str);
      //   str = '';
      //   continue;
      // }
      // claire
      // if((el[i] === '}' || el[i] === ']') && (depth === -1 || i === el.length - 1)) {
      //   // console.log(str);
      //   arr.push(str);
      //   str = '';
      //   continue;
      // }
      // if((el[i] === '}' || el[i] === ']') && depth === -1) {
      //   // console.log(str);
      //   // str += el[i];
      //   arr.push(str);
      //   str = '';
      //   continue;
      // }

    }
    // console.log("String is", str);
    // console.log(isInString);
    // console.log(i === el.length - 1);
    // console.log('depth: ', depth);
    //Throw error if JSON syntax is wrong
    if(depth === 0 && str.length > 0) {
      throw new SyntaxError();
    }

    return arr;
  };

  let removeWhitespace = el => {
    let start = 0;
    let end = el.length - 1;
    while(el[start] === ' ') {
      start++;
    }
    while(el[end] === ' ') {
      end--;
    }
    return el.slice(start, end + 1);
  };

  //Call function to kick off
  return recurse(json);

};
