import { useContext, useState } from "react"
import RestaurantCard from "./RestaurantsCard"
import { Title } from "../context/contextApi"
import { data } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setFilterValue } from "../utils/filterSLice"

function OnlineFood({onlinerestaurantdata}){

    // console.log(onlinerestaurantdata);
      const {title : {title2} } = useContext(Title)

      const filterOptions = [
        {
            filterName : "Ratings 4.0+"
        },
        {
            filterName : "Offers"
        },
        {
            filterName : "Rs.300-Rs.600"
        },
        {
            filterName : "Less than Rs.300"
        },
      ]
      const [activeBtn, setActiveBtn] = useState(null)

      const dispatch = useDispatch()

      function handleFilterBtn(filterName){
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }
    dispatch(setFilterValue(activeBtn))

    return(
        <div>
            <h1 className="font-bold text-2xl mt-3 mb-6">{title2}</h1>

            <div className="flex flex-wrap gap-2 mb-6 ">
                {
                    filterOptions.map((data) =>(
                        
                        <button onClick={()=> handleFilterBtn(data.filterName)} className={"Filterbtn  " + (activeBtn === data.filterName ? "active" : "")} >{data.filterName}
                        <i class="fi fi-br-cross text-center p-1.5 text-[12px] hidden "></i>
                        </button>
                    ))
                }

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">

        {
            onlinerestaurantdata.map(({info, cta : {link}})=> (
              <div className="hover:scale-95 cursor-pointer duration-300">
                {/* <p>{console.log(info)}</p>
                <p>{console.log(link)}</p> */}
                <RestaurantCard {...info} link={link}/>
                </div>
                           
            ))
        }
        </div>
        </div>
    )
}

export default OnlineFood
