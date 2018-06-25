'use strict'


export default function filterOutNestedObjects(nestingMap) {
  // if body of nested object is contained in scope of other object, cut
  // body from object
  console.log(nestingMap.map((n) => n.propName))

  return nestingMap.map((nestingMap, index, maps) => {
    const { propName, body } = nestingMap;

    let toFilter = body;

    maps.forEach((m, i) => {
      // console.log('checking', propName, 'in scope of', m.propName)
      if (m.scope[m.scope.length - 1] === propName) {
        // console.log(propName, 'at end of scope of ', m.propName)
        // console.log('attempting to cut', m.propName + ':{' + m.body + '}', 'from ', toFilter)
        toFilter = toFilter.replace(m.propName + ':{' + m.body + '}', '')
        // console.log('filteredBody looks like this:', toFilter)
      } else {

      }
    })


    return { ...nestingMap, filteredBody: toFilter }
  })

}
