import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

import { Pokemon } from '../../Data/Type/Pokemon';




const RightParty = () => {
  useEffect(() => {
    // パーティを取得して １番目のポケモンをselectポケモンの中に入れる
    // バトルに出たポケモンは一時的にパーティから取り除く
    
    const droppedPokemon = party.find((pokemon, index) => index === 0 );
    setSelectPokemon(droppedPokemon)
    party.shift()
    
  },[]);

  function getPokemonData(){

  }
  const [party, setParty] = useState<Array<Pokemon>>([
    {
      "id": "4323ffd2-2786-4c43-ada2-d72c315e34f1",
      "name": "プクリン",
      "number": 40
    },
  ]);

  const [selectPokemon, setSelectPokemon] = useState<Pokemon | undefined>();

  const handleOnDragEnd = (result:DropResult) => {
    // ドラッグの結果を取得
    const { source, destination } = result;

    // もしドロップ先が指定されていない場合は処理を終了
    if (!destination) {
      return;
    }

    // ポケモンの並び順を変更
    const newParty = Array.from(party);
    const [removed] = newParty.splice(source.index, 1);
    newParty.splice(destination.index, 0, removed);

    // ポケモンの並び順を更新
    setParty(newParty);
    if (destination.droppableId === 'バトル') {
      const battlePokemon = party.find((pokemon, index) => index === source.index);
    
      setTimeout(() => {
        if (selectPokemon){

          // バトルポケモンをパーティから削除する
          console.log(battlePokemon?.name,"パーティから削除します")
          setParty(party.filter((pokeomon)=>(pokeomon != battlePokemon)))
          setSelectPokemon(battlePokemon);
          // ででたポケモン(selectPokemon)をパーティに戻す
          console.log(selectPokemon.name,"をパーティに戻します")         
          setParty((oldParty ) => [...oldParty, selectPokemon])
  
        }
        
      }, 0);
    }
  };
  return (
    <div className='w-1/2'>
      <div className='flex justify-around'>
      
            <div className='bg-gray-300 h-24 w-24 md:h-36 md:w-36 rounded-full  flex'>
              <div className=''>
                
                {selectPokemon && (
                  <>
                    <img className='w-full h-full' src={"http://localhost:3000/Assets/pokemon/image/"+selectPokemon.number+"png"} alt="" />
                    <input className='w-full text-center' type="text" defaultValue={ selectPokemon.name} />
                  </>
                 
                )}
              </div>
              </div>
        
      
      </div>
     
  </div>
  )
};

export default RightParty;


