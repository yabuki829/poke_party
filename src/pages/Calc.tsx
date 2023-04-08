import React, { useEffect, useState } from 'react';
import LeftParty from '../components/Left/LeftParty'
import RigthParty from '../components/Right/RigthParty'
import Calculator from '../components/Calc/Calculator';
import { pokemon_data } from '../data/PokemonData';
import { Pokemon, PokemonMove } from '../data/Type/Pokemon';
import Result from '../components/Calc/Result';
const Calc = () => {
  
  // 右側が攻撃側かどうか
  const [isAttack,setIsAttack] = useState(false)
  // 右側のポケモン
  const [leftPokemon, setLeftPokemon] = useState<Pokemon>(pokemon_data[0])
  // 左側のポケモン
  const [rightPokemon,setRightPokemon] = useState(pokemon_data[400])
  // 攻撃側の攻撃技
  const [selectMove,setSelectMove] = useState<PokemonMove>()
  // 左側のポケモンのstatus
  const [leftStatus,setLeftStatus] = useState()
  // 右側のポケモンのstatus
  const [rightStatus,setRightStatus] = useState()
  // リフレクタや光のかべが貼られているか
  const [iswall,setIsWall] = useState(false)
  // fieldの種類 0 がなし　1 エレキ　2 グラス 3ミスと 4サイコ
  const [field,setField] = useState(0)
  // 天候　 0 なし 1 晴れ　2 雨　3 雪　4 砂嵐
  const [weather,setWeather] = useState()
  //火傷しているか
  const [isBorn,setIsBorn] = useState(false)
  // 攻撃側ポケモンのアイテム
  const [attackItem,setAttackItem] = useState()
  // 守りがわポケモンのアイテム
  const [defenseItem,setDefenseItem] = useState()
  // 攻撃側の攻撃ランク
  const [attackRank,setAttackRank] = useState()
  // 守り側の防御ランク
  const [defenseRank,setDefenseRank] = useState() 
  // 右側の素早さランク
  // 左側の素早さランク
  // TODO: 素早さが早い可能性が高い方の剣や盾のアイコンの下をunderlineをひく
  // ダメージ
  const [damage, setDamage] = useState(0);
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

  return (
    <div>
      <div className='flex justify-around'>
        <LeftParty setPokemon={setLeftPokemon} />

        <Calculator pokemon_A={leftPokemon} pokemon_B={rightPokemon}/>
        
        <RigthParty setPokemon={setRightPokemon }/>
        
      </div>
      <Result/>
      
    </div>
  )
}

export default Calc