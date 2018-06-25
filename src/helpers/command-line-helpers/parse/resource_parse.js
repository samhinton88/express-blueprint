'use strict'
import _parseProps from './parse_props';
import { assignValueToPath } from './utils';

export default function resourceParse(input, activeBlueprint) {

  const flagHash = {
    '-C': ['controller', 'type', 'CRUD'],
    '-cache': ['controller','shouldCache', true]
  }

  const config = {};
  config.resourceName = input[0];
  config.database = 'mongoDB';
  config.type = 'resource';
  config.totalNestedReferencedCount = 0;
  config.props = [];
  config.refs = [];
  config.referencedBy = [];
  config.controller = {};
  config.middleware = [];




  // console.log('config before arguments parsed',config)
  const args = input.slice(1)

  // top level arguments


  args.forEach((arg) =>{

    const fChar = arg.charAt(0);

    if(fChar === '-') {
      // option flag
      const flagPath = flagHash[arg];
      const val = flagPath.pop()
      assignValueToPath(config, val, flagPath)


    }

    if (!['.', ':'].includes(fChar)) {
      // token found
      config.props.push(_parseProps({}, arg, config))
      // console.log('pushed in new prop')
    }
  })

  // register reference to other resources
  activeBlueprint.resources.forEach((r) => {
    console.log('resource in activeBlueprint relation algorythm', r)
    if(!r.refs) { return }

    // add referenced by to other resources on blueprint
    config.refs.forEach((ref) => {

      if (ref.refName === r.resourceName) {

        r.referencedBy.push(config.resourceName)

      }

    })

    // add referenced by to new resource
    if (r.refs.map((ref) => ref.refName).includes(config.resourceName)) {

      config.referencedBy.push(r.resourceName)

    }
  })
  // console.log('config after full process', config)

  return config;

}
