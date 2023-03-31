import React, { useEffect, useState } from 'react';
import LeftParty from '../components/Left/LeftParty'
import RigthParty from '../components/Right/RigthParty'

const Calc = () => {
  const [isAttack,setIsAttack] = useState(false)

  return (
    <div>
      <div className='flex justify-around'>
        <LeftParty/>
 
       
        <div>
          <div className='w-full hidden md:flex rounded-md justify-between bg-white p-5'>
          <div className='px-2'>
              < h1>自分のポケモン</h1>
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
              
              <div className='flex'>
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
          
            <div className='flex items-center'>
              <h1>VS</h1>
            </div>
            <div className='px-2'>
              < h1>相手のポケモン</h1>
              {
                !isAttack? ( <input  placeholder="わざ" className='rounded-full border border-black px-2 ' type="text" / >):(<></>)
              
              }
              

              {
                isAttack? (
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
              
              <div className='flex'>
                <div className='w-full mx-1'>
                  <h1 className='text-gray-600 text-sm text-left'>性格</h1>
                  <select id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200   focus:outline-none focus:ring-0 ">
                    <option value="0.9">0.9倍</option>
                    <option selected value="1.0">1.0倍</option>
                    <option value="1.1">1.1倍</option>
                  </select>
                </div>
                <div className='w-full mx-1'>
                  <h1 className='text-gray-600 text-sm text-left'>ランク</h1>
                    <select id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200  focus:outline-none focus:ring-0 ">
                      <option value="6">+6</option>
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
              </div>
            </div>          
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
        <RigthParty/>

      </div>
      
     
    </div>
  )
}

export default Calc