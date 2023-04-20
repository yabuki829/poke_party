import React, { useEffect, useState } from 'react'
import { Pokemon, PokemonStatus,PokemonMove } from '../../data/Type/Pokemon';
import CalcCard from './CalcCard';
import change from "../../Assets/change.png"

type CalcData = {
  pokemon_left: Pokemon
  pokemon_right: Pokemon

  // 左のポケモン
  setLeftItems: (item: string ) => void
  setLeftStatus: (status: PokemonStatus ) => void
  setLeftMove: (move: PokemonMove ) => void
  leftMove:PokemonMove|undefined
  // 右のポケモン
  setRightItems: (item: string ) => void
  setRightStatus: (status: PokemonStatus ) => void
  setRightMove: (move: PokemonMove ) => void
  rightMove:PokemonMove|undefined
  
  
}
const Calculator = (data:CalcData) => {
  const {pokemon_left,setLeftItems,setLeftMove,setLeftStatus ,leftMove} = data
  const {pokemon_right,setRightItems,setRightMove,setRightStatus,rightMove} = data
  // true左側が攻撃
  const [isAttack,setIsAttack] = useState(true)
  function tapChangeIsAttack(){
    setIsAttack((pre)=> pre = !pre)
  }



  return (
    <div>
      {/* <button >変更</button> */}
        <div className='w-full hidden md:flex  justify-between  '>
          <CalcCard isAttack={isAttack} pokemon={pokemon_left} setItems={setLeftItems} setStatus={setLeftStatus} setMove={setLeftMove} attckerMove={rightMove} />
          <button onClick={tapChangeIsAttack} className='h-12 w-12 p-2'><img src={change} alt="" /></button>
          <CalcCard isAttack={!isAttack} pokemon={pokemon_right} setStatus={setRightStatus} setMove={setRightMove} setItems={setRightItems} attckerMove={leftMove} />
        </div>
          <div className='bg-white my-4  p-2 rounded-md'>
            <h1 className='text-xl font-bold p-2'>環境</h1>
            <div className='flex'>
              <div className='w-full mx-4'>
                <h1 className='text-gray-700'>天候</h1>
                <select id="underline_select" className="text-center w-full   block py-2.5 text-sm  border rounded-xl  border-gray-200 focus:outline-none focus:ring-0  focus:border-blue-500">
                    <option selected value="なし">なし</option>
                    <option  value="はれ">はれ</option>
                    <option value="あめ">あめ</option>
                    <option value="ゆき">ゆき</option>
                    <option value="すなあらし">すなあらし</option>
                </select>
              </div>
              
              <div className='w-full mx-4'>
                <h1 className='text-gray-700'>フィールド</h1>
                <select id="underline_select" className="text-center w-full   block py-2.5 text-sm  border rounded-xl  border-gray-200   focus:outline-none focus:ring-0 focus:border-blue-500">
                    <option selected value="なし">なし</option>
                    <option  value="エレキフィールド">エレキフィールド</option>
                    <option value="グラスフィールド">グラスフィールド</option>
                    <option value="ミストフィールド">ミストフィールド</option>
                    <option value="サイコフィールド">サイコフィールド</option>
                </select>
              </div>
            </div>

            <div className='m-4'>
              <h1 className='text-gray-700'>かべ </h1>
              <div className='flex justify-start'>

                <div className='flex my-2 mx-2'>
                  <button>リフレクター<input className='mx-2' type="checkbox" name="" id="" /></button>
                </div>
                <div className='flex my-2 mx-2'>
                  <button>ひかりのかべ<input className='mx-2' type="checkbox" name="" id="" /></button>
                </div>
              </div>
            </div>
          
          </div>
        </div>
  )
}

export default Calculator