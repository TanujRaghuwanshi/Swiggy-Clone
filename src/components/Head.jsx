import { useContext, useEffect, useState } from "react";
import { data, Link, Outlet } from "react-router-dom";
import { CartContext, Coordinate, Visibility } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearch } from "../utils/toggleSlice";
import SigninBtn from "./SigninBtn";

function Head() {
  const navItem = [
  
    {
      name: "Search",
      Image: <i class="fi fi-br-search"></i>,
      path : "/search"
    },
    {
      name: "Sign in",
      Image: <i class="fi fi-bs-user"></i>,
      path : "/sign-in"
    },
    {
      name: "Cart",
      Image: <i class="fi fi-br-shopping-cart"></i>,
      path : "/cart"
    },
  ];

  const [searchresu, setSearchResu] = useState([]);
  const [address, setAddress] = useState("")
  const visible = useSelector((state) => state.toggleSlice.searchToggle)
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle)
  const dispatch = useDispatch()
  

  // const { visible, setVisible } = useContext(Visibility);
  const {setCoord} = useContext(Coordinate)
  // const {cartData, setCartData} = useContext(CartContext)

  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const userData = useSelector((state) => state.authSlice.userData)


  function handleVisbilty() {
    dispatch(toggleSearch())
  }
  function handleLogin() {
    dispatch(toggleLogin())
  }

  async function searchResultFun(value) {
    // console.log(value);
    if (value == "") return;
    let res = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
    );
    let result = await res.json();
    setSearchResu(result.data);
  }

  async function fetchGeometryData(coordinates) {
    if (coordinates == "") return
    handleVisbilty()
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${coordinates}`)
    const data = await res.json()

    setCoord({ 
        lat: data?.data[0]?.geometry?.location?.lat , 
        lng: data?.data[0]?.geometry?.location?.lng 
    })

    setAddress(data?.data[0]?.formatted_address);
    
  }

  // useEffect(()=>{
  //     searchResult()
  // },[])

  return (
    <div className="relative">
      <div className="w-full ">
        <div
          onClick={handleVisbilty}
          className={
            "bg-black/50 absolute w-full h-full z-20 " +
            (visible ? "visible" : "invisible")
          }></div>

        <div
          className={
            "bg-white md:w-[40%] w-full h-full z-30 absolute duration-500 p-5 " +
            (visible ? "left-0" : "-left-[100%]")
          }>

             
          <div className="flex flex-col w-[65%] justify-center gap-4 ml-[180px]">
         
            <i className="fi fi-br-cross w-5 text-center my-3" onClick={handleVisbilty}></i>
          <input
            type="text"
            className="border text-xl py-3 px-3 focus:outline-none w-full focus:shadow-2xl "
            placeholder="enter location"
            onChange={(e) => searchResultFun(e.target.value)}
          />
          <div className=" p-5">
            <ul>
              {searchresu.map((data, index) => {
                const isLast = (index === searchresu.length - 1)
                return(
                <div className="my-2">
                    {/* <p>{console.log(data)}</p> */}

                    <div className="flex gap-3 items-center ">
                    <i class="fi fi-rr-marker mb-2"></i>
                  <li onClick={() => fetchGeometryData(data?.place_id)}>
                  <p className="hover:text-orange-400 font-semibold text-[18px] ">  {data.structured_formatting.main_text}{" "}</p>
                    <p className="opacity-55">{data.structured_formatting.secondary_text}</p>
                  { !isLast &&  <p className="opacity-50 ">---------------------------------------------</p>}      
                  </li>

                  </div>
                </div>
                )
              })}
            </ul>
          </div>
        </div>
        </div>
      </div>

      <div className="w-full ">
        <div
          onClick={handleLogin}
          className={
            "bg-black/50 absolute w-full h-full z-20 " +
            (loginVisible ? "visible" : "invisible")
          }></div>

        <div
          className={
            "bg-white md:w-[40%] w-full h-full z-30 fixed duration-500 p-7 " +
            (loginVisible ? "right-0" : "-right-[50%]")
          }>

             
          <div className="flex flex-col w-[65%] justify-center gap-4 mr-[180px]">
         
            <i className="fi fi-br-cross w-5 text-center my-3" onClick={handleLogin}></i>

            <div className="flex justify-between items-center">
              <h1 className="font-bold text-3xl border-b-4 pb-4">Login</h1>
              <img className="w-28" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
            <div className="mt-5">
            <SigninBtn/>
            <p className="text-[12px] font-bold mt-1 opacity-65">By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
          </div>

        </div>
        </div>
      </div>

      <div className="w-full shadow-2xl h-[70px] flex justify-center items-center sticky top-0 z-10 bg-white">
        <div className="md:w-[70%] w-full flex items-center justify-between">
          <div className="flex items-center">
            <Link to={"/"}>
            <div className="w-24">
              <img
                className="w-24"
                src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png"
                alt=""
              />
            </div>
            </Link>

            <div
              className="flex cursor-pointer "
              onClick={handleVisbilty}
            >
              <p className="flex items-center">
                <span className="font-bold border-b-[3px] rounded-[5px] border-black hover:border-orange-400 hover:text-orange-400">Others</span>
              <span className="text-[12px] pl-2 opacity-75 line-clamp-1 font-semibold max-w-[180px] min-w-[1px]:">{address}</span>
              </p>
              <i class="fi text-2xl text-orange-400 fi-br-angle-small-down "></i>
            </div>
          </div>

          <div className="flex items-center md:gap-10 gap-6">
            {navItem.map((data) => (

  
                data.name == "Sign in" ?
              
              <div onClick={handleLogin}>
              <div className="flex gap-2 text-[18px] cursor-pointer items-center">
                 
                {
                 userData ? <img className="w-8 rounded-[50%]" src={userData.photo} alt="" /> :
                  data.Image
                }
                {
                  userData ? <p>{userData.name}</p> :
                <p>{data.name}</p>
                }

                { data.name == "Cart" &&
                  <p>{cartData.length}</p>
                }
              </div>
              </div>
              : <Link to={data.path}>
              <div className="flex gap-2 text-[18px] cursor-pointer">
                {data.Image}
                <p>{data.name}</p>

                { data.name == "Cart" &&
                  <p>{cartData.length}</p>
                }
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Head;
 