import React, { useEffect, useState } from 'react';
import LeftParty from '../components/Left/LeftParty'
import RigthParty from '../components/Right/RigthParty'
import Calculator from '../components/Calc/Calculator';
import { pokemon_data } from '../data/PokemonData';
import { Pokemon, PokemonMove, PokemonStatus } from '../data/Type/Pokemon';
import Result from '../components/Calc/Result';
const Calc = () => {
 
  // 右側が攻撃側かどうか
  const [isAttack,setIsAttack] = useState(false)
  // 右側のポケモン
  const [leftPokemon, setLeftPokemon] = useState<Pokemon>(pokemon_data[0])
  // 左側のポケモン
  const [rightPokemon,setRightPokemon] = useState(pokemon_data[0])

  // 攻撃側の攻撃技
  const [selectMove,setSelectMove] = useState<PokemonMove>()
  // 左側のポケモンのstatus
  const [leftStatus,setLeftStatus] = useState<PokemonStatus>()
  // 右側のポケモンのstatus
  const [rightStatus,setRightStatus] = useState<PokemonStatus>()

  // リフレクタや光のかべが貼られているか
  const [iswall,setIsWall] = useState(false)
  // fieldの種類 0 がなし　1 エレキ　2 グラス 3ミスと 4サイコ
  const [field,setField] = useState(0)
  // 天候　 0 なし 1 晴れ　2 雨　3 雪　4 砂嵐
  const [weather,setWeather] = useState()

  //火傷しているか
  const [isBorn,setIsBorn] = useState(false)
  // 右側ポケモンのアイテム
  const [leftItem,setLeftItem] = useState<string>()
  // 左側のポケモン
  const [rightItem,setRightItem] = useState<string>()
  // 攻撃側の攻撃ランク
  const [attackRank,setAttackRank] = useState()
  // 守り側の防御ランク
  const [defenseRank,setDefenseRank] = useState() 
  // 右側の素早さランク
  // 左側の素早さランク
  // TODO: 素早さが早い可能性が高い方の剣や盾のアイコンの下をunderlineをひく
  


  // ダメージ ＝ { ( 50 × 2/5 ＋ 2 ) × 威力 × 攻撃/防御 } ×1/50＋2
  // ダメージ = (((レベル×2/5+2)×威力×A/D)/50+2)×範囲補正×おやこあい補正×天気補正×急所補正×乱数補正×タイプ一致補正×相性補正×やけど補正×M×Mprotect
  function calc(){
    // 右側が攻撃
    
    if (!isAttack){
      console.log("計算します")
      let power = selectMove?.power ? selectMove.power : 1
      let A = leftStatus?.a ? leftStatus.a : 1
      let B = rightStatus?.b ? rightStatus.b : 1
      setHP(rightStatus?.h)
      console.log("HP",rightStatus?.h)
      // 基本ダメージ
      let damege = Math.floor(((50 * 2 / 5 + 2) * power * A / B ) * 1 / 50 + 2)
      // タイプ一致補正
      let type_hosei = 1
      if  (selectMove?.type?(selectMove?.type):"" in leftPokemon.types){
        type_hosei = 1.5
      }
      // 相性補正 0.25 0.5 1.0 2.0 4.0
      
      //乱数補正 0.85 * 1
      setMinDamage(Math.floor(damege*0.85*type_hosei))
      setMaxDamage(Math.floor(damege*1.0*type_hosei))
      alert(damege*1.0*type_hosei)
    }
    else {
      setHP(rightStatus?.h)
    }

  }



  // 最低ダメージ
  const [minDamage, setMinDamage] = useState(0);
  // 最高ダメージ
  const [maxDamage, setMaxDamage] = useState(0);
  // タイプ相性　-1 効果なし  0.25 効果今ひとつ 0.5　効果今ひとつ　1 等倍 2 効果抜群　4　効果抜群 
  const [compatibility, setCompatibility] = useState(1);
  // 性格倍率 0.9, 1.0, 1.1
  const [nature,setNature] = useState()
  // ブーストエナジーの使用
  const [AttackboosterEnergy, setBoosterEnergy] = useState(false)
  // まもる側のHP
  const [HP,setHP] = useState<number|undefined>(100)

  const [isPhysical_left,setIsPhysical] = useState(false)
  useEffect(() => {
    
    calc()
    
  },[selectMove,leftStatus,rightStatus]) 
  return (
    <div>
       
      <div className='flex justify-around'>
     
        <LeftParty setPokemon={setLeftPokemon} />

        <Calculator pokemon_left={leftPokemon} pokemon_right={rightPokemon} setLeftItems={setLeftItem} setLeftStatus={setLeftStatus} setLeftMove={setSelectMove} setRightItems={setRightItem} setRightStatus={setRightStatus} setRightMove={setSelectMove} leftMove={selectMove} rightMove={selectMove}  />
        
        <RigthParty setPokemon={setRightPokemon}/>
        
      </div>
      <Result maxDamage={maxDamage} minDamage={minDamage} HP={HP ? HP :1}/>
       
     
    </div>
  )
}

export default Calc