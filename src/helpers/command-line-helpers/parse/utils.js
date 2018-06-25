export const scanBackFrom = (index, arr) => {
  // console.log('scan back from index', index, 'arr', arr)
  const toProcess = arr;
  let propNameStart

  for (let i=index -1;i>=0;i--) {

    if (
         toProcess[i] === '{'
      || toProcess[i] === ','
      || toProcess[i] === ' '
    )
    {
      propNameStart = i + 1;
      return propNameStart
    }
  }
}

export const isPlural = (string) => {
  return lastOf(string).toLowerCase() === 's';
}

export const getBracketedVal = (opt) => {
  if (!opt || !opt.split('[')[1]) { return }
  let defaultValue = opt.split('[')[1].split('');
  defaultValue.pop()
  const defValue = defaultValue.join('');
  return defValue;
}

export const lastOf = (string) => {
  return string.charAt(string.length - 1);
}

export const lookUp = (path, obj, cb) => {

    for (let i = 0; i < path.length -1; i++) {

      obj = obj[path[i]];

    }

    cb(obj[path[path.length -1]]);
  }
export const assignValueToPath = (obj, data, path) => {


    for (let i = 0; i < path.length -1; i++) {
      obj = obj[path[i]];
    }

    obj[path[path.length -1]] = data;
}

