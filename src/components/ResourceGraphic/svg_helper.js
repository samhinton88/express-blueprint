import React from 'react';

export const circleToPath = ({cx, cy, r, id, cb, style}) => {
  const dPath = `
    M ${cx} ${cy}
    m ${-r}, 0
    a ${r},${r} 0 1,0 ${r * 2},0
    a ${r},${r} 0 1,0 ${-(r *2)} ,0
  `;

  return (
    <path onClick={cb} d={dPath} stroke={style.stroke} fill={style.fill} id={id}/>
  )
}
