import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { pokemon_data } from '../../Data/PokemonData';
import { Pokemon } from '../../Data/Type/Pokemon';


const LeftParty = () => {

  

  
  const [selectPokemon, setSelectPokemon] = useState<Pokemon>({"id": "3d7719f7-8c38-4e1d-a9d2-e5c4d1d524a7",
  "name": "ピカチュウ",
  "number": 25});


  return (
    <div className='w-1/2'>
      <div className='flex justify-around'>
      
            <div className='bg-gray-300 h-24 w-24 md:h-36 md:w-36 rounded-full  flex'>
              <div className=''>
               
                {selectPokemon && (
                  <>
                    {/* <img className='w-full h-full' src={selectPokemon.image} alt="" /> */}
                    <input className='w-full text-center' type="text" defaultValue={ selectPokemon.name} />
                  </>
                 
                )}
              </div>
              </div>
        
      
      </div>
     
  </div>
   
  )
}

export default LeftParty


