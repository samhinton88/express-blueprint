import CLI from './command-line-helpers/parse';

test('returns config object', () => {
  console.log(CLI('create resource user local:{email:S,password:S} stats:{won:N,lost:N,logs:{winLog:S},drawn:N}'))
  expect(
    CLI('create resource user local:{email:S,password:S} stats:{won:N,lost:N,logs:{winLog:s},drawn:N}'))
    .toEqual(
      {
        controller:{},
        database: "mongoDB",
        middleware: [],
        resourceName: 'user',
        refs:[],
        type: 'resource',
        props:[
          {
            isNestedObject: true,
            propName: 'local',
            props: [
              {propName: 'email', type: 'String'},
              {propName: 'password', type: 'String'}
            ]
          },
          {
            isNestedObject: true,
            propName: 'stats',
            props: [
              {propName: 'won', type: 'Number'},
              {propName: 'lost', type: 'Number'},
              {
                isNestedObject: true,
                propName: 'logs',
                props: [
                  {propName: 'winLog', type: 'String'},
                ]
              },
              {propName: 'drawn', type: 'Number'}
            ]
          }
        ]
      }
    )
})

test('does it really well', () => {
  expect(CLI('create resource nesty stats:{nestedProp:N,deepStats:{deepProp:N,deeperStats:{deeperProp:N}}}'))
        .toEqual(
        {
          controller:{},
          database: "mongoDB",
          middleware: [],
          resourceName: 'nesty',
          refs:[],
          type: 'resource',
          props:[
            {
              propName: 'stats',
              isNestedObject: true,
              props: [
                { propName: 'nestedProp', type: 'Number'},
                {
                  propName: 'deepStats',
                  isNestedObject: true,
                  props: [
                    { propName: 'deepProp', type: 'Number'},
                    {
                      propName: 'deeperStats',
                      isNestedObject: true,
                      props: [
                        {propName: 'deeperProp', type: 'Number'}
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
        )
})
