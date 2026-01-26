import { useContext, useEffect, useState } from "react";
import OnlineFood from "./OnlineFood";
import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import { Coordinate, Title } from "../context/contextApi";
import { data } from "react-router-dom";
import { useSelector } from "react-redux";

function Body() {



  const [restaurantdata, setrestaurantdata] = useState([]);
  const [imagedata, setimagedata] = useState([]);
  const [founddata, setfounddata] = useState({});
  const {
    coord: { lat, lng },
  } = useContext(Coordinate);
  // const [title1, setTitle1] = useState("")
  // const [title2, setTitle2] = useState("")
  const { setTitle } = useContext(Title);

  console.log(lat);
  console.log(lng);

  async function fetchData() {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const data = await res.json();

    let actualrestaurabtdata = (data?.data?.cards).filter(
      (data) => data?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setfounddata(data?.data);
    console.log(data);

    // setrestaurantdata(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setrestaurantdata(
      actualrestaurabtdata[0]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setimagedata(data?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setTitle({
      title1: data?.data?.cards[1]?.card?.card?.header?.title,
      title2: data?.data?.cards[2]?.card?.card?.title,
    });

    // setTitle1(data?.data?.cards[1]?.card?.card?.header?.title)
    // setTitle2(data?.data?.cards[2]?.card?.card?.title)
  }

  // console.log(restaurantdata);
  // console.log(imagedata);

  // const restaurantdata =
  //   data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  // const imagedata = data?.data?.cards[0]?.card?.card?.imageGridCards?.info;

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

   const filterVal = useSelector((state => state.filterSlice.filterVal))
   console.log(restaurantdata);


   const filteredData = restaurantdata.filter(item => {
     if (!filterVal) return true
      
     switch(filterVal){
      case "Ratings 4.0+" : return item?.info?.avgRating > 4
      case "Offers" : return 
      case "Rs.300-Rs.600" : return item?.info?.costForTwo?.slice(1,4) >= 300 && item?.info?.costForTwo?.slice(1,4) <= 600
      case "Less than Rs.300" : return item?.info?.costForTwo?.slice(1,4) <= 300
        default : return true;

     }
     
   })

  if (founddata?.communication) {
    return (

        <div className="flex justify-center items-center flex-col text-center h-[80vh] my-auto ">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_238,h_238/portal/m/location_unserviceable.png"
            alt=""
          />
          <h1 className="text-2xl font-bold">Location Unserviceable</h1>
          <h2 className="p-2 opacity-75 text-center">
            We don't have any services here till now. Try changing location.
          </h2>
        </div>
    
    );
  }

  return (
    <div className="w-full">
      <div className="md:w-[75%] w-[95%] mx-auto mt-5 overflow-hidden">
        <OnYourMind imagedata={imagedata} />
        <TopRestaurant restaurantdata={restaurantdata} />
        <OnlineFood onlinerestaurantdata={ filterVal ? filteredData : restaurantdata } />
      </div>
    </div>
  );
}

export default Body;
