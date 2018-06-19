'use strict'
import scanCurlyBraces from './scan_curly_braces';
import nestingMapWithBodies from './map_body_to_nesting_abstract';
import filterOutNestedObjects from './filter_out_nested_objects';
import parseObjectBodies from './parse_object_bodies';
import restructureNestedProp from './restructure_nested_prop';
import processConfig from './process_config';
import mapBodyToNestingAbstract from './map_body_to_nesting_abstract';


export default function _parseProps(memo, propsString) {
  // establish layer
  const [propName, propBody] = propsString.split(/:(.+)/);

  console.log('propName', propName, 'propBody', propBody)

  memo.propName = propName;

  if (!propBody) { return memo }

  let nestingMap;

  const props = [];

  if (propBody.split('').includes('{')) {
    // contains nested object, go ahead and analyse it

    nestingMap = scanCurlyBraces(memo, propsString);

    // process nesting map into prop name and config pairs
    console.log('process nesting map into props',  nestingMap)

    const nestingMapWithBodies = nestingMap.map((m) => {

      return mapBodyToNestingAbstract(m, propsString)

    })

    console.log('nesting map with bodies', nestingMapWithBodies)

    const seperatedObjects = filterOutNestedObjects(nestingMapWithBodies);

    console.log('seperatedObjects', seperatedObjects);

    // object bodies can now be safely parsed
    const parsedObjects = parseObjectBodies(seperatedObjects);

    console.log('parsedObjects', parsedObjects);

    // once parsed, resstructure objects to reflect nesting
    const prop = restructureNestedProp(parsedObjects);

    console.log('restructured prop', prop)

    return prop;
  };

  return { ...processConfig(propBody.split(';')), propName }

}
