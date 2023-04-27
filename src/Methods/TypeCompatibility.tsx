
// 技のタイプ, 受けがわのポケモンのタイプ1 ポケモンのタイプ2　テラスたるのタイプ
export function TypeCompatibility(moveType:string, type1:string, type2:string){
  let compatibility = 1

  // ノ	炎	水	電	草	氷	格	毒	地	飛	超	虫	岩	霊	竜	悪	鋼	妖
  if (moveType == "ノーマル"){
    // 無効　タイプ ゴースト
    
    // 半減  いわ　はがね
  }
  else if (moveType == "ほのお"){
    // くさ　こおり　はがね　むし
    // ほのお　水　岩　ドラゴン
  }
  else if (moveType == "みず"){
    // 炎　じめん　岩
    //水　草　ドラゴン
  }
  else if (moveType == "でんき"){
    // じめん
    // 水　ひこう
    // でんき　草　ドラゴン

  }
  else if (moveType == "くさ"){
    // 水　じめん　岩
    //炎　草　毒　ひこう　むし　ドラゴン　はがね
  }
  else if (moveType == "かくとう"){
    // ゴースト
    // ノーマル　こおり　　岩　あく　はがね
    // どく　ひこう　エスパー　むし　フェアリー
  }
  else if (moveType == "こおり"){
    // 草　じめん　ひこう　ドラゴン
    // 炎　水　こおり　はがね
  }
  else if (moveType == "どく"){
    // はがね
    // 草　フェアリー
    //どく　じめん　岩　ゴースト
  }
  else if (moveType == "じめん"){
    // ひこう
    // 炎　電気　どく　岩　はがね
    // 草　むし　
  }
  else if (moveType == "ひこう"){
    // 草　格闘　じめん　　むし
    // 電気　岩　はがね
    
  }
  else if (moveType == "エスパー"){
    // あく
    // 格闘　どく　
    // エスパー
  }
  else if (moveType == "むし"){
    // 草　エスパー　あく
    //　炎　格闘　どく　ひこう　ゴースト　はがね　フェアリー
  }
  else if (moveType == "いわ"){
    // 炎　子おり　ひこう　　むし
    // 格闘　じめん　ドラゴン
  }
  else if (moveType == "ゴースト"){
    // ノーマル
    // ゴースト　エスパ＾
    // あく
  }
  else if (moveType == "ドラゴン"){
    // フェアリ
    // ドラゴン　
    // はがね
  }
  else if (moveType == "あく"){
    // エスパー　ゴースト
    // 格闘　あく　フェアリー
  }
  else if (moveType == "はがね"){
    //こおり　岩　フェアリー
    // 炎　水　電気 はがね
  }
  else if (moveType == "フェアリー"){
    // 格闘　あく　ドラゴン　
    // 炎　どく　はがね
  }

  return compatibility
}
