import React, { useEffect, useState } from 'react';
import { pokemon_data } from '../../data/PokemonData';
import { Pokemon } from '../../data/Type/Pokemon';

import {  Dispatch, SetStateAction } from "react";


type left_pokemon = {
  setPokemon : (pokemon: Pokemon) => void
}
const LeftParty:React.FC<left_pokemon> = ({setPokemon}) => {  
  const [selectPokemon, setSelectPokemon] = useState<Pokemon>();
  const [suggests,setSuggest] = useState<Array<Pokemon>>();
  const [isSuggestion,setIsSuggestion] = useState(false)
  const [text, setText] = React.useState("");
  
  function filterName(e:React.ChangeEvent<HTMLInputElement>){
    setText(e.target.value)
    setIsSuggestion(true)
    const katakana_name = kanaToHira(e.target.value)

    let data = pokemon_data
    // 10件だけ表示する
    let filter_poke:Array<Pokemon> = []
    data.map((poke) =>{
      const limit = katakana_name.length
      if (filter_poke.length >= 10){
        return
      }
      if (poke.name.slice(0,limit) == katakana_name){
        // filter_poke.push(poke)
      }      
    })
    
    setSuggest(filter_poke)
  }
  
  function kanaToHira(str:string) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
  }
  function handlePokemonSelection(pokemon: Pokemon) {
    setSelectPokemon(pokemon);
    setText(pokemon.name)
    setIsSuggestion(false)
  }
  return (
    <div className='w-1/2'>
      <div className='flex justify-center '>
        <div className='bg-gray-300 h-24 w-24 md:h-36 md:w-36 rounded-full '>
          {selectPokemon && (
            <>
              <img className='w-full ' src={"http://localhost:3000/pokemon/"+selectPokemon.number+".png"} alt="" />
              <input onChange={(e)=>filterName(e)} className='w-full text-center' type="text" value={ text}  />
              <div className='bg-white '>
                {isSuggestion ?( 
                  suggests?.map(pokemon => (
                  <div key={pokemon.id} className=' hover:bg-gray-300'>
                      <button className='w-full text-left p-1 ml-1 ' onClick={() => handlePokemonSelection(pokemon)} >{pokemon.name}</button>
                  </div>
                  
                ))):(<></>) }
              </div>
            </>
          )}
        </div>
      </div>
      <br />
      
  </div>
   
  )
}

export default LeftParty
