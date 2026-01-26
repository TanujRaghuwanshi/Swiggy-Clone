import { useContext, useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { CartContext, Coordinate } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../utils/cartSlice";
import toast from "react-hot-toast";

function RestaurantMenu() {
  const obj = useParams();

  let mainId = obj.id.split("-").at(-1).split("rest").at(-1);

  const [menuData, setmenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [value, setvalue] = useState(0);
  const [topPickData, settopPickdata] = useState(0);
  const {coord : {lat , lng} } = useContext(Coordinate)

  async function fetchData() {
    let res = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&submitAction=ENTER`
    );
    let data = await res.json();
    // console.log(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);
    setResInfo(data?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    let actualMenu =
      (data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
    setmenuData(actualMenu);

    // console.log((data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.title == "Top Picks")[0]);
    settopPickdata(
      (data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.title == "Top Picks"
      )[0]
    );
  }
  //   console.log(resInfo);
  // console.log(topPickData);

  useEffect(() => {
    fetchData();
  }, []);

  function handlenext() {
    value == 196 ? "" : setvalue((prev) => prev + 28);
  }

  function handleprev() {
    value == 0 ? "" : setvalue((next) => next - 28);
  }

  return (
    <div className="w-full">
      <div className="w-[52%] mx-auto">
        <p className="opacity-100 mt-8 text-[14px] cursor-pointer">
          {" "}
          <Link to={"/"}>
            <span className="opacity-70 hover:font-medium">Home</span>
          </Link>{" "}
          / <span className="opacity-70 hover:font-medium">{resInfo.city}</span>{" "}
          / <span className="font-medium">{resInfo.name}</span>
        </p>
        <h1 className="font-bold pt-5 pl-3 pb-5 text-3xl">{resInfo.name}</h1>
        <div className="h-56 p-5 bg-gradient-to-t from-slate-300/80 rounded-[55px]">
          <div className="w-full border border-white rounded-[35px] h-full p-3 bg-white">
            <div className="flex items-center gap-1 font-semibold">
              <i className="fi fi-sr-circle-star text-green-500"></i>
              <span>{resInfo.avgRating}</span>{" "}
              <span> ({resInfo.totalRatingsString})</span>.
              <span>{resInfo.costForTwoMessage}</span>
            </div>

            <p className="underline font-semibold text-orange-500">
              {resInfo?.cuisines?.join(",")}
            </p>
            <div className="flex gap-2 mt-2">
              <div className="mt-2 opacity-70">
                <div className="w-2 h-2 bg-gray-500 rounded-2xl"></div>
                <div className="w-0.5 h-6 bg-gray-500 ml-[3px]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-2xl"></div>
              </div>
              <div className="flex flex-col text-sm gap-3 mt-0.5">
                <div className="flex gap-4">
                  <span className="font-semibold">Outlet</span>{" "}
                  <span className="opacity-80">{resInfo.locality}</span>
                </div>
                <p className="font-semibold">{resInfo?.sla?.slaString}</p>
              </div>
            </div>

            <hr className="mt-3 opacity-25 border " />
            <div>
              <div className="flex mt-2.5 gap-2">
                <img
                  className="w-7  "
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"
                  alt=""
                />
                <span className="font-semibold">
                  {resInfo?.sla?.lastMileTravelString}
                </span>
                <span className="opacity-70">
                  | Delivery fees applicable. Delivered & charged by the
                  restaurant
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl mt-4 pl-3">Deals for you</h1>
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
          <div className="flex gap-3 min-w-full overflow-hidden">
            {discountData.map((data) => (
              <Discount data={data} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-center font-bold">MENU</h1>

          <div className="w-full mt-4 relative cursor-pointer">
            <div className="w-full text-center py-3 bg-slate-400/25 rounded-2xl">
              {" "}
              <span className="font-bold opacity-65"> Search for dishes </span>
            </div>
            <i className="fi fi-br-search absolute top-3 right-4 text-[20px] opacity-65"></i>
          </div>

          {topPickData && (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl mt-4 pl-3">Top Picks</h1>
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
              <div className="flex gap-2 min-w-full overflow-hidden">
                {topPickData?.card?.card?.carousel.map(
                  ({
                    creativeId,
                    dish: {
                      info: { defaultPrice, finalPrice, description, name },
                    },
                  }) => (
                    // <Discount data={data} />
                    <div className="mt-4 min-w-[300px] relative h-[300px] ">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
                        alt=""
                      />
                      <div className=" text-white absolute bottom-3 w-full justify-between">
                        <p>₹{finalPrice / 100 || defaultPrice / 100}</p>
                        <button className="text-[18px] drop-shadow border w-20 py-1 rounded-2xl text-green-500 font-bold border-green-500 bg-white absolute bottom-1 left-8 cursor-pointer hover:scale-90">
                          ADD
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
        {menuData.map(({ card: { card } }) => (
          <MenuCard card={card} resInfo = {resInfo}/>
        ))}
      </div>
    </div>
  );

  function Discount({
    data: {
      info: { header, offerLogo, couponCode },
    },
  }) {
    // console.log(info);

    return (
      <div
        className="flex min-w-[318px] h-[76px] border border-black/20 rounded-2xl items-center gap-2 mt-4 duration-200 "
        style={{ translate: `-${value}%` }}
      >
        <img
          className="w-14 p-0.5 ml-3"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
          alt=""
        />
        <div>
          <h2 className="font-bold text-[18px]">{header}</h2>
          <p className="font-semibold opacity-60">{couponCode}</p>
        </div>
      </div>
    );
  }


  function MenuCard({ card, resInfo }) {

  const [currIndex, setcurrIndex] = useState(() => !!card?.["@type"]);

  function toggleFun() {
    setcurrIndex((prev) => !prev);
  }

  if (card?.itemCards) {
    return (
      <>
        <div className="mt-4">
          <div className="flex justify-between font-semibold">
            <h1
              className={
                "font-bold text-" + (card["@type"] ? "xl" : "base opacity-85")
              }
            >
              {card?.title} ({card?.itemCards.length})
            </h1>
            <i
              className={
                currIndex
                  ? "fi fi-rr-angle-up"
                  : "fi fi-rr-angle-down"
              }
              onClick={toggleFun}
            ></i>
          </div>

          {currIndex && <DetailMenu items={card} resInfo={resInfo} />}
        </div>
        <hr
          className={
            "my-4 border-slate-400/25 border-" +
            (card["@type"] ? "[10px]" : "[4px]")
          }
        />
      </>
    );
  } else {
    return (
      <div>
        <h1 className="text-2xl font-bold mt-3">{card?.title}</h1>
        {card?.categories?.map((data, index) => (
          <MenuCard key={index} card={data} resInfo={resInfo} />
        ))}
      </div>
    );
  }
}

function DetailMenu({ items, resInfo }) {
  return (
    <div className="my-2 mt-1">
      {items?.itemCards?.map(({ card: { info } }, index) => (
        <DetailMenuCard key={index} info={info} resInfo={resInfo} />
      ))}
    </div>
  );
}


  function DetailMenuCard({info, resInfo}) {

    const {
      
                price,
                 name,
                  itemAttribute: { vegClassifier },
                  description = "",
                  ratings: {
                    aggregatedRating: { rating, ratingCountV2 },
                  },
                  imageId,
                  id,
                  defaultPrice,
                  
    } = info ;
    
    // const {cartData, setCartData} = useContext(CartContext)
    const cartData = useSelector((state) => state.cartSlice.cartItems)


    const getInfoFromLoacal = useSelector((state) => state.cartSlice.resInfo)
    
    const dispatch = useDispatch()
    
    function handleAddToCart(){
      
      // console.log(resInfo);
      const isAdded = cartData.find((data) => data.id === info.id)
      // let getInfoFromLoacal = JSON.parse(localStorage.getItem("resInfo")) || []
      
      if (!isAdded) { 
        if (getInfoFromLoacal.name === resInfo.name || getInfoFromLoacal.length === 0) {
           dispatch(addToCart({info, resInfo}))    
            toast.success("food added to the cart")
          } else {
            // alert("Different resturant item ")
            toast.error("Different resturant item")
            handleIsDiffres()
          }
        }else{
          toast.error("Already added")
          // alert("already added")
        }  
      }

      const [more, setmore] = useState(false);
      let trimDes = description.substring(0, 130) + "...";

      const [isDiffRes, setDiffRes] = useState(false)
      function handleIsDiffres(){
        setDiffRes((prev) => !prev)
      }
        function handleclearCart(){
        dispatch(clearCart())
        handleIsDiffres()
        toast.success("Cart is cleared")
    }
    
    return (
      <div className="relative">
        <div className="flex w-full h-[165px] mt-2 justify-between">
          <div className="w-[70%] h-full">
            {vegClassifier === "VEG" ? (
              <img
                className="w-[18px] "
                src="https://5.imimg.com/data5/SELLER/Default/2023/1/FC/HP/EV/74736417/plain-barcode-labels.jpeg"
                alt=""
              />
            ) : (
              <img
                className="w-[18px] "
                src="https://www.pngkit.com/png/detail/261-2619388_big-image-egg-veg-or-non-veg.png"
                alt=""
              />
            )}
            {/* <p>{vegClassifier}</p> */}
            <h2 className="font-bold text-[18px] opacity-75">{name}</h2>
            <p className="font-semibold ">
              ₹{price / 100 || defaultPrice / 100}
            </p>

            {rating ? (
              <div className="flex gap-1 items-center">
                <i class="fi fi-ss-star text-green-600"></i>
                <p>
                  {rating}({ratingCountV2})
                </p>
              </div>
            ) : (
              ""
            )}
            {description.length > 130 ? (
              <div>
                <span className="">{more ? description : trimDes}</span>
                <button
                  className="font-semibold mt-2 cursor-pointer hover:scale-90"
                  onClick={() => setmore(!more)}
                >
                  {more ? "less" : "more"}
                </button>
              </div>
            ) : (
              <span>{description}</span>
            )}
          </div>
          <div className="w-[20%] h-full relative">
            <img
              className="rounded-2xl aspect-square "
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150,c_fit/${imageId}`}
              alt=""
            />
            <button onClick={handleAddToCart} className="text-[18px] drop-shadow border w-20 py-1 rounded-2xl text-green-500 font-bold border-green-500 bg-white absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-90">
              ADD
            </button>
          </div>
        </div>
        <hr className="my-4 border-slate-400/25 border-[1px]" />
        {
          isDiffRes && (
            <div className="w-[520px] h-[204px] left-[33%] border shadow-md fixed z-20 bottom-10 bg-white p-6">
              <h1 className="text-2xl font-bold">Items already in cart</h1>
              <p className="">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
              <div className="flex justify-between w-full mt-5">
                <button onClick={handleIsDiffres} className="w-[45%] py-2 font-bold text-xl border border-green-700 text-green-700">NO</button>
                <button onClick={handleclearCart} className="w-[45%] py-2 font-bold text-xl border bg-green-700 text-white">YES, START AFRESH</button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default RestaurantMenu;
