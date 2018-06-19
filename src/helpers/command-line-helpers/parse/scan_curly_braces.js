'use strict'
import { scanBackFrom } from './utils';

export default function scanCurlyBraces(memo = {}, string) {
  // map structure of nested objects

  let openCount;
  const openCache = [], processedCache = [], obj = {};
  let depth = 0, scope = [];

  console.log('string in scanCurlyBraces', string)

  const toProcess = string.split('')

  toProcess.forEach((char, i, arr) => {
    if (char === '{') {
      // is nested object
      depth++;
      const propNameStart = scanBackFrom(i, arr);

      const propName = toProcess.slice(propNameStart, i - 1).join('')


      console.log('got propNameStart', propNameStart)

      obj[propName] = [];

      console.log('obj after attempt to add propname', obj)

      openCache.push({
        propName: toProcess.slice(propNameStart, i - 1).join(''),
        rawTopLevelProp: string,
        openIndex: i,
        atDepth: depth,
        scope: [...scope]
      });
      scope.push(propName);

    } else if (char === '}') {

      depth--;

      openCache[openCache.length - 1].closeIndex = i;
      processedCache.push(openCache.pop());
      scope.pop();

    }
  })

  return processedCache.map((o) => {

    return [o];

  })
}
