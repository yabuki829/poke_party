import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

type Pokemon = {
  id: string;
  name: string;
};

const LeftParty = () => {

  
  const [party, setParty] = useState<Array<Pokemon>>([
    {
      id:"0",
      name:"カイリュー"
    },
    {
      id:"1",
      name:"ミミッキュ"
    },
    {
      id:"2",
      name:"コノヨザル"
    },
    {
      id:"3",
      name:"ラウドボーン"
    },
    {
      id:"4",
      name:"セグレイブ"
    },
    {
      id:"5",
      name:"ハッサム"
    },
  ]);

  const [selectPokemon, setSelectPokemon] = useState<Pokemon | null>(null);
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
    if (destination.droppableId === 'droppable2') {
      const droppedPokemon = party.find((pokemon, index) => index === source.index);
      setSelectPokemon(droppedPokemon || null);
    }
  };

  return (
    <div className=''>
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='flex justify-around'>
        <Droppable droppableId='droppable'>
          {(provided) => (
            // <div className='flex justify-around'>
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {party.map((pokemon, index) => (
                  <Draggable key={pokemon.id} draggableId={pokemon.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {pokemon.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              {/* </div> */}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='droppable2'>
              {(provided) => (
                 <div className='bg-gray-300 h-36 w-36 rounded-full flex justify-center items-center'>
                <div className='' {...provided.droppableProps} ref={provided.innerRef}>
                 
                    {provided.placeholder}
                  {selectPokemon && (
                    <h1 className='text-xl font-bold'>{selectPokemon.name}</h1>
                  )}
                  {provided.placeholder}
                  
                </div>
                </div>
              )}
              </Droppable>
          
        
        </div>
       
      </DragDropContext>
    </div>
  </div>
   
  )
}

export default LeftParty