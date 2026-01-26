import { useState } from "react";

function OnYourMind({imagedata}) {

  const [value, setvalue] = useState(0);

  function handlenext() {
    value == 196 ? "" : setvalue((prev) => prev + 28);
  }

  function handleprev() {
    value == 0 ? "" : setvalue((next) => next - 28);
  }  

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">What's on your mind?</h1>
        <div className="flex gap-3 items-center justify-center">
          <div
            onClick={handleprev}
            className={
              `bg-gray-200 cursor-pointer w-9 h-9 flex justify-center items-center rounded-[50%] ` +
              (value <= 0 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi fi-br-angle-left ` +
                (value <= 0 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
          <div
            onClick={handlenext}
            className={
              `bg-gray-200 cursor-pointer w-9 h-9 flex justify-center items-center rounded-[50%] ` +
              (value <= 196 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi fi-br-angle-right ` +
                (value == 196 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>
      <div style={{ translate: `-${value}%` }} className="flex duration-400">
        {
          imagedata.map((data) => (
          <img
            className="w-40 cursor-pointer "
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/${data.imageId}`}
            alt=""
          />
        ))}
      </div>
        <hr className="mt-5 opacity-25 border " />
    </div>
  );
}

export default OnYourMind
