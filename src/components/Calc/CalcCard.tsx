import React, { useEffect, useState } from 'react'
import { Pokemon,PokemonMove,PokemonStatus } from '../../data/Type/Pokemon'
import shield from "../../Assets/pokemon/shield.png"
import sword from "../../Assets/pokemon/sword.png"
type CalcCard = {
  isAttack:boolean
  pokemon: Pokemon
  setItems: (item: string ) => void
  setStatus: (status: PokemonStatus ) => void
  setMove: (move: PokemonMove ) => void
  attckerMove: PokemonMove|undefined
}



// HP
// (種族値+個体値/2+努力値/8)+60

// HP以外の能力値（攻撃、防御、特攻、特防、素早さ）
// {(種族値+個体値/2+努力値/8)+5}×性格補正

// setStatusにはステイタスの実数値を入れたい

const CalcCard:React.FC<CalcCard> = ({isAttack,pokemon,setItems,setMove,setStatus,attckerMove}) => {
  const [suggests,setSuggest] = useState<Array<PokemonMove>>([]);
  const [isSuggestion,setIsSuggestion] = useState(false)
  const [ move, setSelectMove] = useState<PokemonMove|undefined>();
  const [ text, setText] = useState<string|undefined>("");
  const [isChecked, setIsChecked] = useState(false);
  const [ type ,setType] = useState("")

  // ステイタスの実数値 性格補正もこみ
  const [ pokestatus ,setPokeStatus] = useState<PokemonStatus>( {h: 0,a: 0,b: 0,c: 0,d: 0,s: 0} )
  // 最大 252
  const [ effortValue ,setEffortValue] = useState<PokemonStatus>( {h: 0,a: 0,b: 0,c: 0,d: 0,s: 0} )
  let [seikaku,setSeikaku] = useState(1.0)
  const [isPhysicalMove,setIsPhysicalMove] = useState(false)
  useEffect(() => {
    if (attckerMove?.category == "物理技"){
      setIsPhysicalMove(true)
    }
    else {
      setIsPhysicalMove(false)
    }
    
    
  },[attckerMove]) 

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  function filterName(e:React.ChangeEvent<HTMLInputElement>){
    setText(e.target.value)
    setIsSuggestion(true)
    const katakana_name = kanaToHira(e.target.value)

    // 10件だけ表示する
    let filter_moves:Array<PokemonMove> = []
    pokemon.moves.map((move) =>{
      const limit = katakana_name.length
      if (filter_moves.length > 5){
        return
      }
      if (kanaToHira(move.name.slice(0,limit)) == katakana_name){
        filter_moves.push(move)
      }      
    })
    setSuggest(filter_moves)
  }

  function kanaToHira(str:string) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
  }
  // サジェッションから技を選択する
  function handleMoveSelection(move:PokemonMove){
    setSelectMove(move)
    setMove(move)
    setText(move.name)
    setIsSuggestion(false)
  }
  // (種族値+個体値/2+努力値/8)+60
  //　努力値を+4し実数値を更新する
  function didPlusHP(index:number){

    if (index == 0){
      setEffortValue(prevState => ({
        ...prevState,
        h: prevState.h  = 0,
      }));
      setPokeStatus(pre => ({
        ...pre,
        h:  Math.floor(((pokemon.status.h + 31/2) + (0) / 8 + 60 ))  
      }))
    }
    else if (index == 252) {
      setEffortValue(prevState => ({
        ...prevState,
        h: prevState.h  = 252,
      }));
      setPokeStatus(pre => ({
        ...pre,
        h:  Math.floor((pokemon.status.h + 31/2) + (252) / 8 + 60)
      }))
    }
    else {
      if (effortValue.h  + 4 <= 252) {
        setEffortValue(prevState => ({
          ...prevState,
          h: prevState.h + 4,
        }));
        // もしも　effortValue が0であれば
       
        setPokeStatus(pre => ({
          ...pre,
          h:  Math.floor((pokemon.status.h + 31/2) + (effortValue.h + 4) / 8 + 60)
        }))
      }
    } 
    setStatus(pokestatus)
  }
  //HPの努力値を-4し実数値を更新する
  function didMinusHP(){
    
      if (effortValue.h - 4 >= 0) {
        setEffortValue(prevState => ({
          ...prevState,
          h: prevState.h - 4,
        }));
  
        if (effortValue.h - 4 == 0){
          setPokeStatus(pre => ({
            ...pre,
            h: Math.floor((pokemon.status.h + 31/2)  + 60)
          }))
        }
        else{
          setPokeStatus(pre => ({
            ...pre,
            h: Math.floor((pokemon.status.h + 31/2) + (effortValue.h - 4) / 8 + 60)
          }))
        }
      
    }
    setStatus(pokestatus)
  }
  // 252ボタンを押したかどうかをindexで判断してる
  function didPlusA(index:number){
    if (index == 0){
      setEffortValue(prevState => ({
        ...prevState,
        a: prevState.a  = 0,
      }));
      setPokeStatus(pre => ({
        ...pre,
        a:  Math.floor(((pokemon.status.a + 31/2) + (0) / 8 + 5 )* seikaku)  
      }))
    }
    else if (index == 252) {
      setEffortValue(prevState => ({
        ...prevState,
        a: prevState.a  = 252,
      }));
      setPokeStatus(pre => ({
        ...pre,
        a:  Math.floor(((pokemon.status.a + 31/2) + (252) / 8 + 5 )* seikaku)  
      }))
    }
    else{
      if (effortValue.a  + 4 <= 252) {
        setEffortValue(prevState => ({
          ...prevState,
          a: prevState.a + 4,
        }));
        setPokeStatus(pre => ({
          ...pre,
          a:  Math.floor(((pokemon.status.a + 31/2) + (effortValue.a + 4) / 8 + 5 )* seikaku)  
        }))
      }
    }
    setStatus(pokestatus)
   
  }
  function didMinusA(){
    if (effortValue.a - 4 >= 0) {
      setEffortValue(prevState => ({
        ...prevState,
        a: prevState.a - 4,
      }));

      if (effortValue.a - 4 == 0){
        setPokeStatus(pre => ({
          ...pre,
          a:Math.floor(((pokemon.status.a + 31/2)  + 5 )* seikaku)
        }))
      }
      else{
        setPokeStatus(pre => ({
          ...pre,
          a: Math.floor(((pokemon.status.a + 31/2) + (effortValue.a + 4) / 8 + 5 )* seikaku)  
        }))
      }
    }
    setStatus(pokestatus)
  }
  //Bの努力値を+4し実数値を更新する
  function didPlusB(index:number){
    if (index == 0) {
      setEffortValue(prevState => ({
        ...prevState,
        b: prevState.a  = 0,
      }));
      setPokeStatus(pre => ({
        ...pre,
        b:  Math.floor(((pokemon.status.b + 31/2) + (0) / 8 + 5 )* seikaku)  
      }))
    }
    else if (index == 252) {
      setEffortValue(prevState => ({
        ...prevState,
        b: prevState.b  = 252,
      }));
      setPokeStatus(pre => ({
        ...pre,
        b:  Math.floor(((pokemon.status.b + 31/2) + (252) / 8 + 5 )* seikaku)  
      }))
    }
    else {
      if (effortValue.b  + 4 <= 252) {
        setEffortValue(prevState => ({
          ...prevState,
          b: prevState.b + 4,
        }));
        setPokeStatus(pre => ({
          ...pre,
          b:  Math.floor(((pokemon.status.b + 31/2) + (effortValue.b + 4) / 8 + 5 )* seikaku)  
        }))
      }
    }
    
    setStatus(pokestatus)
  }
  // {(種族値+個体値/2+努力値/8)+5}×性格補正
  function didMinusB(){
    if (effortValue.b - 4 >= 0) {
      setEffortValue(prevState => ({
        ...prevState,
        b: prevState.b - 4,
      }));

      if (effortValue.b - 4 == 0){
        setPokeStatus(pre => ({
          ...pre,
          b: Math.floor(((pokemon.status.b + 31/2)  + 5 )* seikaku)
        }))
      }
      else{
        setPokeStatus(pre => ({
          ...pre,
          b: Math.floor(((pokemon.status.b + 31/2) + (effortValue.b - 4) / 8 + 5) * seikaku) 
        }))
      }
    }
    setStatus(pokestatus)
  }
  function didPlusC(index:number){
    if (index == 0) {
      setEffortValue(prevState => ({
        ...prevState,
        c: prevState.c  = 0,
      }));
      setPokeStatus(pre => ({
        ...pre,
        c:  Math.floor(((pokemon.status.c + 31/2) + (0) / 8 + 5 )* seikaku)  
      }))
    }
    else if (index == 252) {
      setEffortValue(prevState => ({
        ...prevState,
        c: prevState.c  = 252,
      }));
      setPokeStatus(pre => ({
        ...pre,
        c:  Math.floor(((pokemon.status.c + 31/2) + (252) / 8 + 5 )* seikaku)  
      }))
    }
    else {
      if (effortValue.c  + 4 <= 252) {
        setEffortValue(prevState => ({
          ...prevState,
          c: prevState.c + 4,
        }));
        setPokeStatus(pre => ({
          ...pre,
          c:  Math.floor(((pokemon.status.c + 31/2) + (effortValue.c+ 4) / 8 + 5 )* seikaku)  
        }))
      }
    }
    setStatus(pokestatus)
    
  }
  function didMinusC(){ 
    if (effortValue.c - 4 >= 0) {
      setEffortValue(prevState => ({
        ...prevState,
        c: prevState.c - 4,
      }));

      if (effortValue.c - 4 == 0){
        setPokeStatus(pre => ({
          ...pre,
          c: Math.floor(((pokemon.status.c + 31/2)  + 5 )* seikaku)
        }))
      }
      else{
        setPokeStatus(pre => ({
          ...pre,
          c: Math.floor(((pokemon.status.c + 31/2) + (effortValue.c - 4) / 8 + 5) * seikaku) 
        }))
      }
    }
  }
  function didPlusD(index:number){
    if (index == 0) {
      setEffortValue(prevState => ({
        ...prevState,
        d: prevState.d  = 0,
      }));
      setPokeStatus(pre => ({
        ...pre,
        d:  Math.floor(((pokemon.status.d + 31/2) + (0) / 8 + 5 )* seikaku)  
      }))
    }
    else if (index == 252) {
      setEffortValue(prevState => ({
        ...prevState,
        d: prevState.d  = 252,
      }));
      setPokeStatus(pre => ({
        ...pre,
        d:  Math.floor(((pokemon.status.d + 31/2) + (252) / 8 + 5 )* seikaku)  
      }))
    }else{
      if (effortValue.d  + 4 <= 252) {
        setEffortValue(prevState => ({
          ...prevState,
          d: prevState.d + 4,
        }));
        setPokeStatus(pre => ({
          ...pre,
          d:  Math.floor(((pokemon.status.d + 31/2) + (effortValue.d + 4) / 8 + 5) * seikaku) 
        }))
      }
    }
    setStatus(pokestatus)
  }
  function didMinusD(){
    if (effortValue.d - 4 >= 0) {
      setEffortValue(prevState => ({
        ...prevState,
        d: prevState.d - 4,
      }));

      if (effortValue.d - 4 == 0){
        setPokeStatus(pre => ({
          ...pre,
          d: Math.floor(((pokemon.status.d + 31/2)  + 5 )* seikaku) 
        }))
      }
      else{
        setPokeStatus(pre => ({
          ...pre,
          d: Math.floor(((pokemon.status.d + 31/2) + (effortValue.d - 4) / 8 + 5) * seikaku ) 
        }))
      }
    }
    setStatus(pokestatus)
  }

  function didChangeValue(e:React.ChangeEvent<HTMLSelectElement>){
    alert(e.target.value)
    setSeikaku(Number(e.target.value))
  }

  return (
    <div className='px-5 p-3 bg-white rounded-md mx-1 '>
      <div className='flex items-center justify-between '>
        < h1 className='font-bold'>{pokemon.name}</h1>
        { isAttack ? (<img className='h-6 w-6  border-gray-700' src={sword} alt="" />) :(<img className='h-6 w-6  border-gray-700' src={shield} alt="" />)}
      </div>
   
      <h1 className='text-gray-600 text-sm'>{pokemon.status.h}-{pokemon.status.a}-{pokemon.status.b}-{pokemon.status.c}-{pokemon.status.d}-{pokemon.status.s} </h1>
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
      <div className='flex items-center'>
        <div className='relative '>
          {move ? ( <h1 className='text-gray-500 text-xs'>{move?.type}威力{move?.power} {move.category}</h1>):(<></>)}
         
          <input onChange={(e)=>filterName(e)} value={text} className='w-full rounded-full border border-black px-2 '  placeholder="わざ"  type="text" / >
          <div className=' bg-white  absolute w-full shadow-2xl bg-gray-300'>
            {isSuggestion ?( 
              suggests?.map(move => (
                <div key={move.name} className=' hover:bg-gray-300 '>
                  <button className='w-full text-left p-1 ml-1 ' onClick={() => handleMoveSelection(move)} >{move.name}</button>
                  <hr />
                </div>
                            
            ))):(<></>) }
          </div>
        </div>
        <label>
      <span></span>
    </label>
      </div>
      
    
      ):(
        <><button>タイプ変更</button>
        </>)
    
    }

    {
      !isAttack? (
      <>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <div className='w-full'>
          <h1>HP</h1>
          <input  className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="HP"value={`${pokestatus.h} (${effortValue.h})`} /  >
        </div>
        <div className='flex'>
          <button onClick={() => didPlusHP(1)} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>+</button>
          <button onClick={didMinusHP} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>-</button>
        </div>
          <button onClick={() => didPlusHP(0)} className='border border-gray-500 p-2 text-sm'>0</button>
          <button onClick={() => didPlusHP(252)} className='border border-gray-500  p-2 text-sm'>252</button>
        </div>

        {

          isPhysicalMove ? (
            <div>          
            <div className='flex items-center border-b border-teal-500 py-2'>
              <div className='w-full'>
                <h1>防御</h1>
                <input  className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="HP"value={`${pokestatus.b} (${effortValue.b})`} /  >
      
              </div>
              <div className='flex'>
                <button onClick={() => didPlusB(1)} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>+</button>
                <button onClick={didMinusB} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>-</button>
              </div>
              <button onClick={() => didPlusB(0)} className='border border-gray-500 p-2 text-sm'>0</button>
              <button onClick={() => didPlusB(252)} className='border border-gray-500  p-2 text-sm'>252</button>
  
            </div>
           
          </div>
          ):(
            <div>
              <div className='flex items-center border-b border-teal-500 py-2'>
                <div className='w-full'>
                  <h1>特防</h1>
                  <input  className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="HP"value={`${pokestatus.d} (${effortValue.d})`} /  >
                </div>
                <div className='flex'>
                  <button onClick={() => didPlusD(1)} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>+</button>
                  <button onClick={didMinusD} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>-</button>
                </div>
                <button onClick={() => didPlusD(0)} className='border border-gray-500 p-2 text-sm'>0</button>
                <button onClick={() => didPlusD(252)} className='border border-gray-500  p-2 text-sm'>252</button>
            
              </div>

            </div>
          )
        }

       
        
        
       
      </>):(
        <> 
          { 
            isPhysicalMove? (
              <div className='flex items-center border-b border-teal-500 py-2'>
              <div className='w-full'>
                <h1>攻撃</h1>
                <input  className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="特攻" value={`${pokestatus.a} (${effortValue.a})`}  /  >
              </div>
              <div className='flex'>
                <button onClick={() => didPlusA(1)} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>+</button>
                <button onClick={didMinusC} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>-</button>
              </div>
              <button onClick={() => didPlusA(0)} className='border border-gray-500 p-2 text-sm'>0</button>
            <button onClick={() => didPlusA(252)} className='border border-gray-500  p-2 text-sm'>252</button>
            </div>
            ):(
              <div className='flex items-center border-b border-teal-500 py-2'>
              <div className='w-full'>
                <h1>特攻</h1>
                <input  className="appearance-none bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="特攻" value={`${pokestatus.c} (${effortValue.c})`}  /  >
              </div>
              <div className='flex'>
                <button onClick={() => didPlusC(1)} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>+</button>
                <button onClick={didMinusC} className='w-6 h-6 bg-gray-100 rounded-full mr-1 hover:bg-gray-300'>-</button>
              </div>
              <button onClick={() => didPlusC(0)} className='border border-gray-500 p-2 text-sm'>0</button>
            <button onClick={() => didPlusC(252)} className='border border-gray-500  p-2 text-sm'>252</button>
            </div>
            ) 
          }
        </>
    
        )
    }
    
    <div>          
      <div className='flex '>
        <div className='w-full mx-1'>
          <h1 className='text-gray-600 text-sm text-left'>性格</h1>
          <select onChange={(e) => didChangeValue(e)} id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200 focus:outline-none focus:ring-0 ">
            <option value="1.1">1.1倍</option>
            <option selected value="1.0">1.0倍</option>
            <option value="0.9">0.9倍</option>
          </select>
        </div>
        <div className='w-full mx-1'>
              <h1 className='text-gray-600 text-sm text-left'>ランク</h1>
                <select id="underline_select" className="text-center w-full  block py-2.5 text-sm  border rounded-xl  border-gray-200 focus:outline-none focus:ring-0 ">
                  <option value="6">+6</option>
                  <option value="5">+5</option>
                  <option value="4">+4</option>
                  <option value="3">+3</option>
                  <option value="2">+2</option>
                  <option value="1">+1</option>
                  <option selected value="0">±0</option>
                  <option value="-1">-1</option>
                  <option value="-2">-2</option>
                  <option value="-3">-3</option>
                  <option value="-4">-4</option>
                  <option value="-5">-5</option>
                  <option value="-6">-6</option>

                </select>
            </div>
          </div>
        </div>
    <div className='flex items-center border-b border-teal-500 py-2'>
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 px-2 leading-tight focus:outline-none" type="text" placeholder="特性"/ >    
    
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 px-2 leading-tight focus:outline-none" type="text" placeholder="持ち物"/ >    
    </div>

    {/* <div className='flex items-center border-b border-teal-500 py-2'>
    
    </div > */}
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