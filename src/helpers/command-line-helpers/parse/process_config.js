'use strict'
import {
  getBracketedVal,
  isPlural
} from './utils'


export default function processConfig(options, propName, output = {}) {

    const typeHash = {
      'S': 'String',
      'D': 'Date',
      'N': 'Number',
      'BOOL': 'Boolean'
    };

    const optHash = {
      'r': ['required', true],
      'u': ['unique', true],

    }
    console.log('in processOption with options', options)

    options.forEach(processOption)

    return output;

    function processOption(o) {

      if (['S', 'N', 'D', 'BOOL'].includes(o)) {
        console.log('in typeHash')
        output.type = typeHash[o];
        console.log(output.type)
      }


      if (o.split('[')[0] === 'ref') {
        console.log('in ref')
        // is ref to other resource
        const rel = isPlural(propName) ? '1:N' : '1:1';
        const refName = getBracketedVal(o)

        const refObj = {
          rel,
          refName
        };

        config.refs.push(refObj);

        output.type = 'objectID';
        output.ref = refName;
        return
      }

      if (o.charAt(0) === 'd') {
        console.log('in default')
        // option has default
        const defValue = getBracketedVal(o);
        output.default = defValue;
        return
      }
      if (optHash[o]) {
        console.log('in opthash')
        const [optionKey, optionVal] = optHash[o]

        output[optionKey] = optionVal;
      }
      console.log('end of processOption with output', output)
      return output;
    }
}
