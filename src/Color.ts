import { Color } from 'three';

// Color.NAMES[Math.random(Object.entries(Color.NAMES).length)]
// console.log(Color);

export const randomColor = (): string => Object.keys(Color.NAMES)[Math.random() * 148];
