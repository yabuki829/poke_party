import React from 'react'



type Result = {
  maxDamage : number
  minDamage : number
  HP:number
}


const Result:React.FC<Result> = ({maxDamage,minDamage,HP }) => {
 
 

  function kakutei(){
    // 確定数と乱数の数が同じであれば確定数を表示する
    if (Math.ceil(HP / maxDamage )== 1) {
      if (Math.ceil(HP / minDamage )== 1){
        return "確定1発"
      }
      return "乱数1発"
    }
    //  Math.ceil(HP / maxDamage)
    return `確定${Math.ceil(HP/minDamage)}発`
  }
  return (
    <>
      <div className='w-screen bg-gray-100 h-32 sticky absolute bottom-0 '>
        <h1 className='bg-blue-300 px-2'>計算結果</h1> 
        最大ダメージ{maxDamage},最小ダメージ{minDamage}, 最大HP{HP}
        <div className="w-full">

          <div className="w-full">
            <div className="flex justify-start mr-16 font-bold">
              <div className="ml-2">
                <p>{minDamage}~{maxDamage}({ Math.floor(minDamage / HP * 100 )}% ~ {Math.floor(maxDamage / HP * 100) }%) {kakutei()} </p>
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
                  HP-maxDamage > 0.8
                    ? "bg-green-400"
                    :  HP - maxDamage > 0.5
                    ? "bg-green-400"
                    : "bg-green-400"
                } text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full h-4 absolute`}
                style={{
                  width: `${
                    minDamage / HP > 1
                      ? 0
                      : 100 - (minDamage / HP) * 100
                  }%`,
                  transition: "width 0.3s ease-in-out",
                }}
              >
              </div>
              {/*  最小ダメージ*/}
              <div
                className={`${
                  maxDamage / HP > 0.8
                    ? "bg-green-700"
                    : maxDamage / HP > 0.5
                    ? "bg-amber-500"
                    : "bg-green-600"
                } text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4 absolute`}
                style={{
                  width: `${
                    maxDamage / HP > 1
                      ? 0
                      : 100 - (maxDamage / HP) * 100
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