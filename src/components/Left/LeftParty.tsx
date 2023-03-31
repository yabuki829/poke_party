import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

type Pokemon = {
  id: string;
  name: string;
};

const LeftParty = () => {

  
  const [party, setParty] = useState<Array<Pokemon >>([
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
  useEffect(() => {
    // パーティを取得して １番目のポケモンをselectポケモンの中に入れる
    // バトルに出たポケモンは一時的にパーティから取り除く
    
    const droppedPokemon = party.find((pokemon, index) => index === 0 );
    setSelectPokemon(droppedPokemon)
    party.shift()
    
  },[]);
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='flex justify-around'>
      <Droppable droppableId='パーティ'>
        {(provided) => (
          // <div className='flex justify-around'>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {party.map((pokemon, index) => (
                <Draggable key={pokemon.id} draggableId={pokemon.id} index={index}>
                  {(provided) => (
                    <div{...provided.draggableProps} {...provided.dragHandleProps}ref={provided.innerRef} >
                      <div className='h-20 w-20 md:h-24 md:w-24 my-5  '>
                        <img className='w-full h-full' src="https://zukan.pokemon.co.jp/zukan-api/up/images/index/89953014f442146518ef45787d9bb0a4.png" alt="" />
                        <input className='w-full ' type="text" defaultValue={ pokemon.name} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            {/* </div> */}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='バトル'>
            {(provided) => (
            <div className='bg-gray-300 h-24 w-24 md:h-36 md:w-36 rounded-md  flex'>
              <div className='' {...provided.droppableProps} ref={provided.innerRef}>
               
                  {provided.placeholder}
                {selectPokemon && (
                  <>
                   <img className='w-full h-full' src="https://zukan.pokemon.co.jp/zukan-api/up/images/index/89953014f442146518ef45787d9bb0a4.png" alt="" />
                    <h1 className='text-center text-xl font-bold text-white'>{selectPokemon.name}</h1>
                  </>
                 
                )}
                {provided.placeholder}
                
              </div>
              </div>
            )}
            </Droppable>
        
      
      </div>
     
    </DragDropContext>
  </div>
   
  )
}

export default LeftParty


