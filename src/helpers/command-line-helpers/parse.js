'use strict'

module.exports = function CLI(input) {
  let terminalInput =[];

  terminalInput = input.split(' ')
  console.log('terminalInput', terminalInput)
  // id base command
  const [verb, type] = terminalInput.slice(0,2);

  let output = {};

  //
  switch (type) {
    case 'resource':

      output = resourceParse(terminalInput.slice(2));
      break;
  }


  return output;
}

function resourceParse(input) {

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

  const flagHash = {
    '-C': ['controller', 'type', 'CRUD'],
    '-cache': ['controller','shouldCache', true]
  }

  const config = {};
  config.resourceName = input[0];
  config.database = 'mongoDB';
  config.type = 'resource';
  config.props = [];
  config.refs = [];
  config.controller = {};
  config.middleware = [];
  console.log('config before arguments parsed',config)
  const args = input.slice(1)

  args.forEach((arg) =>{

    const fChar = arg.charAt(0);

    if(fChar === '-') {
      // option flag
      const flagPath = flagHash[arg];
      const val = flagPath.pop()
      assignValueToPath(config, val, flagPath)

      return
    }

    if (!['.', ':'].includes(fChar)) {
      // token found
      config.props.push(processProp(arg))
      console.log('pushed in new prop')
    }
  })

  console.log('config after full process', config)

  return config;

  function processProp(p) {
    console.log('in process prop with ', p)
    const output = {};
    const [propName, propConfig] = p.split(/:(.+)/);
    console.log('propName', propName, 'propConfig', propConfig)
    output.propName = propName;

    if (propConfig === undefined) { return output }

    if (propConfig.charAt(0) === '{') {
      console.log('is nested')
      output.isNestedObject = true;
      const arr = propConfig.split('')
      // scan string for matching brackets
      let open = 0, closingIndex;
      arr.forEach((char, i) => {
        if (char === '{') {
          open++
        } else if (char === '}'){
          open--
        }

        if (open === 0) {
          closingIndex = i;
        }
      })
      const toProcess = arr.slice(1, closingIndex).join('');

      console.log('to process', toProcess)

      const nestedObject = arr.join('');
      output.props = processNestedObject(toProcess);
    }

    propConfig.split(';').forEach((option) => {
      processOption(output, option, propName)
    })


    if (output.default && output.type !== 'String') {
        // coerce default value
        if (type === 'Number') {
          output.default = parseInt(output.default)
        } else if (type === 'Date' ){
          output.default = Date[output.default]
        } else if (type === 'Boolean') {
          output.default = output.default === 'true' ? true : false;
        }
      }

    if (isPlural(propName)) {
        // // prop is array
        // output.type = [outputype];
    }

    return output;
  }

  function processOption(output, o, propName) {
    console.log('in processOption with o', o)

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

function processNestedObject(o) {
  const props = o.split(',')
  const output = {};

  return props.map((p) => {
    return processProp(p)
  })

}

}

function isPlural(string) {
  return lastOf(string).toLowerCase() === 's';
}

function getBracketedVal(opt) {
  let defaultValue = opt.split('[')[1].split('');
  defaultValue.pop()
  const defValue = defaultValue.join('');
  return defValue;
}

function lastOf(string) {
  return string.charAt(string.length - 1);
}

function lookUp(path, obj, cb) {

    for (let i = 0; i < path.length -1; i++) {

      obj = obj[path[i]];

    }

    cb(obj[path[path.length -1]]);
  }
function assignValueToPath(obj, data, path) {


    for (let i = 0; i < path.length -1; i++) {
      obj = obj[path[i]];
    }

    obj[path[path.length -1]] = data;
  }



