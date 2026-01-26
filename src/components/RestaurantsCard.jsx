import React from "react"
import { data, Link } from "react-router-dom"

function RestaurantCard(data) {


  // const words = [ data.link.split("/")[3], data.link.split("/")[4], data.link.split("/")[5]];

  // let joinLink = words.join('/');

  // console.log(data.link.split("/").at(-3));
  // console.log(data.link.split("/")[5]);
  // console.log(joinLink);
  

  return (
    <Link to={`/restaurantMenu/${data.link.split("/")[5]}`}>
      <div className=" min-w-[240px] h-[175px] relative">
        <img
          className="min-w-full h-full object-cover rounded-2xl"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${data?.cloudinaryImageId}`}
          alt=""
        />
        <div className="bg-gradient-to-t from-black from-1% to-transparent to-50% absolute top-0 w-full h-full rounded-2xl"></div>
         <p className="absolute bottom-0 text-white p-2 font-bold text-[18px]">
            {
                data?.aggregatedDiscountInfoV3? 
              data?.aggregatedDiscountInfoV3?.header +
                " " +
                data?.aggregatedDiscountInfoV3?.subHeader : ""
              }
            </p>
        {/* <div>
          {data?.info?.aggregatedDiscountInfoV3?.header != "" ? (
            <p className="absolute bottom-0 text-white p-2 font-bold text-[18px]">
              {data?.info?.aggregatedDiscountInfoV3?.header +
                " " +
                data?.info?.aggregatedDiscountInfoV3?.subHeader}
            </p>
          ) : (
            <p className="absolute bottom-0 text-white p-2 font-bold text-[18px]">
              10% OFF
            </p>
          )}
        </div> */}
      </div>
      <div className="flex flex-col mt-1.5">
        <h2 className="font-bold text-[18px] line-clamp-1">
          {data?.name}
        </h2>
        <p className="flex items-center gap-1 font-semibold opacity-85">
          <i className="fi fi-sr-circle-star text-green-500 mt-0.5"></i>{" "}
          {data?.avgRating}. <span>{data?.sla?.slaString}</span>
        </p>
        <p className="opacity-70 line-clamp-1">
          {data?.cuisines.join(", ")}
        </p>
        <p className="opacity-70">{data?.locality}</p>
      </div>
    </Link>
  )
}

export default RestaurantCard