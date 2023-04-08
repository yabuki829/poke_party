import React from 'react'
import { Pokemon } from '../Data/Type/Pokemon'
import shield from "../Assets/pokemon/shield.png"
import sword from "../Assets/pokemon/sword.png"
type CalcCard = {
  isAttack:boolean
  pokemon: Pokemon
}
const CalcCard:React.FC<CalcCard> = ({isAttack,pokemon}) => {
  

  return (
    <div className='px-5 p-3 bg-white rounded-md mx-1 '>
      <div className='flex items-center justify-between'>
        < h1>{pokemon.name}</h1>
        { isAttack ? (<img className='h-6 w-6  border-gray-700' src={sword} alt="" />) :(<img className='h-6 w-6  border-gray-700' src={shield} alt="" />)}
      </div>
   
    
    <div className='flex'>
      {
        pokemon.types.map((type) => (  
          <h1>{type}</h1>
          )
        )
      } 
    </div>
    
    {
    isAttack? ( 
    <input  placeholder="わざ" className='rounded-full border border-black px-2 ' type="text" / >
      ):(
        <><button>タイプ変更</button>
        </>)
    
    }

    {
      !isAttack? (
      <>
      <div className='flex items-center border-b border-teal-500 py-2'>
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="HP"/ >
          <button className='border border-gray-500 p-2 text-sm'>0</button>
          <button className='border border-gray-500  p-2 text-sm'>252</button>
        </div>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="防御"/ >
          <button className='border border-gray-500 p-2 text-sm'>0</button>
          <button className='border border-gray-500  p-2 text-sm'>252</button>
        
        </div>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="特防"/ >
          <button className='border border-gray-500 p-2 text-sm'>0</button>
          <button className='border border-gray-500  p-2 text-sm'>252</button>
        
        </div>
      </>):(
      <> 
      
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="攻撃"/ >
          <button className='border border-gray-500 p-2 text-sm '>0</button>
          <button className='border border-gray-500  p-2 text-sm'>252</button>
          
        </div>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input className="appearance-none bg-transparent border-none   text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="特殊"/ >
          <button className='border border-gray-500 p-2 text-sm'>0</button>
          <button className='border border-gray-500  p-2 text-sm'>252</button>
          
        </div></>)
    }
    
    <div className='flex '>
      <div className='w-full mx-1'>
        <h1 className='text-gray-600 text-sm text-left'>性格</h1>
        <select id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200 focus:outline-none focus:ring-0 ">
          <option value="0.9">0.9倍</option>
          <option selected value="1.0">1.0倍</option>
          <option value="1.1">1.1倍</option>
        </select>
      </div>
      <div className='w-full mx-1'>
        <h1 className='text-gray-600 text-sm text-left'>ランク</h1>
          <select id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200 focus:outline-none focus:ring-0 ">
            <option value="6">6</option>
            <option value="5">+5</option>
            <option value="4">+4</option>
            <option value="3">+3</option>
            <option value="2">+2</option>
            <option value="1">+1</option>
            <option selected value="0">0</option>
            <option value="-1">-1</option>
            <option value="-2">-2</option>
            <option value="-3">-3</option>
            <option value="-4">-4</option>
            <option value="-5">-5</option>
            <option value="-6">-6</option>

          </select>
      </div>
    </div>
    <div className='flex items-center border-b border-teal-500 py-2'>
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="特性"/ >    
    </div>
    <div className='flex items-center border-b border-teal-500 py-2'>
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="持ち物"/ >    
    </div >
    <div className='flex'>
    {
      isAttack?( 
      <div className='flex my-2'>
        <button>やけど<input className='mx-2' type="checkbox" name="" id="" /></button>
      </div>
      ):(<></>)
    }
    {
      isAttack?( 
      <div className='flex my-2'>
        <button>急所<input className='mx-2' type="checkbox" name="" id="" /></button>
      </div>
      ):(<></>)
    }
    </div>
  
  </div>
  )
}

export default CalcCard

function s(s: any): React.ReactNode {
  throw new Error('Function not implemented.')
}
