import { useContext, useState } from "react";
import RestaurantCard from "./RestaurantsCard";
import { Title } from "../context/contextApi";

function TopRestaurant({restaurantdata}){

      const [value, setvalue] = useState(0);      
    
      function handlenext() {
        value == 320 ? "" : setvalue((prev) => prev + 32);
      }
    
      function handleprev() {
        value == 0 ? "" : setvalue((next) => next - 32);
      }
      console.log(restaurantdata);
      
    const {title : {title1}} = useContext(Title)

    return(
        <div className="mt-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">{title1}</h1>
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
              (value <= 320 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi fi-br-angle-right ` +
                (value == 320 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4 duration-200 " style={{translate: `-${value}%`}}>
        {
            restaurantdata.map(({info, cta: {link}})=> (
              <div className="hover:scale-95 cursor-pointer duration-300">
                <RestaurantCard {...info} link ={link}/>
                </div>
                           
            ))
        }
        
      </div>
        <hr className="mt-5 opacity-25 border " />
    </div>
    )
}

export default TopRestaurant