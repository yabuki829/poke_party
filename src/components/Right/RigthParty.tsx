import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { pokemon_data } from '../../Data/PokemonData';
import { Pokemon } from '../../Data/Type/Pokemon';


type right_pokemon = {
  setPokemon : (pokemon: Pokemon) => void
}

const RightParty:React.FC<right_pokemon> = ({setPokemon}) => {
  const [suggests,setSuggest] = useState<Array<Pokemon>>();
  const [isSuggestion,setIsSuggestion] = useState(false)
  const [text, setText] = useState<string|undefined>("");
  const [party, setParty] = useState<Array<Pokemon>>([]);
  const [selectPokemon, setSelectPokemon] = useState<Pokemon | undefined>();

  useEffect(() => {
    // パーティを取得して １番目のポケモンをselectポケモンの中に入れる
    // バトルに出たポケモンは一時的にパーティから取り除く
    setParty([pokemon_data[10],pokemon_data[1],pokemon_data[2],pokemon_data[3],pokemon_data[4]])
    const droppedPokemon = party.find((pokemon, index) => index === 0 );
    setSelectPokemon(pokemon_data[0])
    
  },[]);
  
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
        filter_poke.push(poke)
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
    alert(pokemon.abilities)
    setSelectPokemon(pokemon);
    setText(pokemon.name)
    setIsSuggestion(false)
    setPokemon(pokemon)
  }


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
          setText(battlePokemon?.name)
          setPokemon(battlePokemon|| pokemon_data[20])
        }
        
      }, 0);
    }
  };
  return (
   <div className='w-1/2'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className='flex justify-around'>
            <div>
            <Droppable droppableId='バトル'>
              {(provided) => (
                 <div className='bg-gray-300 h-24 w-24 md:h-36 md:w-36 rounded-full'>
                <div className='' {...provided.droppableProps} ref={provided.innerRef}>
                 
                    {provided.placeholder}
                  {selectPokemon && (
                     <>
                    <img className='w-full ' src={"http://localhost:3000/pokemon/"+selectPokemon.number+".png"} alt="" />
                     <input onChange={(e)=>filterName(e)} className='w-full text-center' type="text" value={text}  />
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
                  {provided.placeholder}
                  
                </div>
                </div>
              )}
              </Droppable>
              
              
            </div>
          <Droppable droppableId='パーティ'>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {party.map((pokemon, index) => (
                    <Draggable key={pokemon.id} draggableId={pokemon.id} index={index}>
                      {(provided) => (
                        <div className=' ' {...provided.draggableProps} {...provided.dragHandleProps}ref={provided.innerRef}>
                          <div className='bg-white rounded-full h-20 w-20 md:h-24 md:w-24 my-5 '>
                          <img className='w-full ' src={"http://localhost:3000/pokemon/"+pokemon.number+".png"} alt="" />
                          
                            <h1 className='w-full text-center'>{ pokemon.name}</h1>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
            )}
          </Droppable>
          </div>
         
        </DragDropContext>
      </div> 
  )
};

export default RightParty;


