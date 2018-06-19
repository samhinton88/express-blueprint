'use strict'

export default function mapBodyToNestingAbstract(map, string) {
  const [{ openIndex, closeIndex}] = map;

  return {...map[0], body: string.substr(openIndex + 1, closeIndex - openIndex - 1)}
}
