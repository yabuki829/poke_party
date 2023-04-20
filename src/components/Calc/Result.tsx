import React from 'react'



type Result = {
  defenderHP : number
  attckderA : number
  
}


const Result = () => {
  let maxDamage = 50
  let minDamage = 40
  let hp = 100 
 
  let compatibility = 2

  function kakutei(){
    // 確定数と乱数の数が同じであれば確定数を表示する
  }
  return (
    <>
      <div className='w-screen bg-gray-100 h-32 sticky absolute bottom-0 '>
        <h1 className='bg-blue-300 px-2'>計算結果</h1> 
        <div className="w-full">

          <div className="w-full">
            <div className="flex justify-start mr-16 font-bold">
              <div className="ml-2">
                <p>{minDamage}~{maxDamage}({minDamage / hp * 100 }% ~ {maxDamage / hp * 100 }%) 乱数{ Math.ceil(hp / maxDamage)}発 </p>
              </div>
     
            </div>
          </div>
          <br />
          <div className="w-full flex justify-center items-center">
            <div className="w-11/12 bg-gray-200 rounded-full relative">
              {/* 一番下のやつ */}
              <div
                className="bg-gray-300 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4 absolute "
                style={{
                  width: `100%`,
                }}
              ></div>
              {/* 最大ダメージ */}
              <div
                className={`${
                  hp-maxDamage > 0.8
                    ? "bg-green-400"
                    :  hp - maxDamage > 0.5
                    ? "bg-green-400"
                    : "bg-green-400"
                } text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full h-4 absolute`}
                style={{
                  width: `${
                    minDamage / hp > 1
                      ? 0
                      : 100 - (minDamage / hp) * 100
                  }%`,
                  transition: "width 0.3s ease-in-out",
                }}
              >
              </div>
              {/*  最小ダメージ*/}
              <div
                className={`${
                  maxDamage / hp > 0.8
                    ? "bg-green-700"
                    : maxDamage / hp > 0.5
                    ? "bg-amber-500"
                    : "bg-green-600"
                } text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4 absolute`}
                style={{
                  width: `${
                    maxDamage / hp > 1
                      ? 0
                      : 100 - (maxDamage / hp) * 100
                  }%`,
                  transition: "width 0.3s ease-in-out",
                }}
              >
              </div>
            </div>
          </div>
         
        </div>
      </div> 
    </>
  )
}

export default Result