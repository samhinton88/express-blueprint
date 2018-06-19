'use strict'
import _parseProps from './parse_props';
import { assignValueToPath } from './utils';

export default function resourceParse(input) {

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

  // top level arguments


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
      config.props.push(_parseProps({}, arg))
      console.log('pushed in new prop')
    }
  })

  console.log('config after full process', config)

  return config;

}
