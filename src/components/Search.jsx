import { useContext, useEffect, useState } from "react"
import { Coordinate } from "../context/contextApi"
import { data } from "react-router-dom"


function Search(){

    const [searchQuery, setsearchQuery] = useState("")
    const {coord : {lat , lng} } = useContext(Coordinate)


      const filterOptions = ["Restaurant", "Dishes",]

      const [activeBtn, setActiveBtn] = useState("Dishes")
      const [dishes, setdishes] = useState([])
      const [restaurantData, setRestaurantData] = useState([])

      function handleFilterBtn(filterName){
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }

    async function fetchDishes() {
        let res = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=8909e5e6-b94d-ecb8-18bb-2bc9f7f851b6&submitAction=ENTER&queryUniqueId=c1d35b79-4d64-ab55-358c-9c67dc83750f`)
        let result = await res.json()

        setdishes((result?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info));
        
    }
    


    async function fetchRestaurantData() {
        let res = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=c1d35b79-4d64-ab55-358c-9c67dc83750f&selectedPLTab=RESTAURANT`)
        let result = await res.json()

        setRestaurantData((result?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data => data?.card?.card?.info));
    }

    useEffect(() => {
        if (searchQuery === "" ) {
            return
        }
        fetchDishes()
        fetchRestaurantData()
    },[searchQuery])
    

    return(
        <div className="w-full">
            <div className="w-[60%] mx-auto" >
            <input onChange={(e) => setsearchQuery(e.target.value)} className="w-full p-2.5 px-3 border border-gray-400/75 text-xl mt-14 font-semibold opacity-75" type="text" placeholder="Search for restaurant and food" />
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {
                    filterOptions.map(filterName =>(
                        
                        <button onClick={()=> handleFilterBtn(filterName)} className={"Filterbtn  " + (activeBtn === filterName ? "active" : "")} >{filterName}
                        </button>
                    ))
                }

            </div>

            <div className="w-full bg-[#f4f5f7] ">
                {
                    activeBtn == "Dishes" ? (
                        <Dishes/>
                    ) : (
                        <Restaurant/>
                    )
                }
            </div>
            </div>
        </div>
    )

    function Dishes(){


        return(
            <div className="grid grid-cols-2 gap-8 justify-between p-8">
                {
                    dishes.map(({card : {
                        card : {
                        info : {imageId = "", name, price, isVeg = 0 },
                        restaurant : {info : { id, name : resName, avgRating, sla : {slaString}}}
                    }}}) => (

                   <div className="w-[100%] bg-white h-[276px]">
                    <div>
                        <h1>{resName}</h1>
                    </div>
                    <div>

                    </div>
                   </div>
                        
                    ))
                }

            </div>    
            
            
        )
    }


    function Restaurant(){

        return(
            <div>
                {
                    restaurantData.map(({card : {
                        card : {
                         info : { id,cloudinaryImageId,costForTwoMessage,cuisines, aggregatedDiscountInfoV3 = {} , promoted = false, name : resName, avgRating, sla : {slaString}}
                    }}}) => (

                    <h1>{resName}</h1>
                        
                    ))
                }

            </div>    
            
            
        )

    }
}

export default Search