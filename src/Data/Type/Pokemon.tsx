
export type Pokemon = {
  id:string,
  number:number,
  name: string,
  abilities:string[],
  types:string[],
  status:PokemonStatus
  moves:PokemonMove[]
};
export type PokemonStatus = {
  h: number;
  a: number;
  b: number;
  c: number;
  d: number;
  s: number;
};
export type PokemonMove = {
  name: string;
  type: string;
  power: number;
  isTouch: boolean;
  category: string;
};
