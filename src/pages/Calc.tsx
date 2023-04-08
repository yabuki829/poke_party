import React, { useEffect, useState } from 'react';
import LeftParty from '../components/Left/LeftParty'
import RigthParty from '../components/Right/RigthParty'
import Calculator from '../components/Calculator';
import { pokemon_data } from '../Data/PokemonData';
import { Pokemon } from '../Data/Type/Pokemon';
import Result from '../components/Result';
const Calc = () => {
  
  const [isAttack,setIsAttack] = useState(false)
  const [leftPokemon, setLeftPokemon] = useState<Pokemon>(pokemon_data[0])
  const [rightPokemon,setRightPokemon] = useState(pokemon_data[400])
  return (
    <div>
      <div className='flex justify-around'>
        <LeftParty setPokemon={setLeftPokemon}/>

        <Calculator pokemon_A={leftPokemon} pokemon_B={rightPokemon}/>
        
        <RigthParty setPokemon={setRightPokemon }/>
        
      </div>
      <Result/>
      
    </div>
  )
}

export default Calc