import { useContext } from "react";
import { CartContext } from "../context/contextApi";
import { data, Link, Links, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toggleLogin } from "../utils/toggleSlice";



function Cart() {
    // const {cartData, setCartData} = useContext(CartContext)
    // console.log(cartData)

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    
    const resInfo = useSelector((state) => state.cartSlice.resInfo)
    console.log(cartData);
    console.log(resInfo);
    
    
    
    const dispatch = useDispatch()

    let totalPrice = 0;
      for (let i = 0; i < cartData.length; i++) {
        totalPrice += (cartData[i].defaultPrice || cartData[i].price);
      }

    //OR

    // let totalPrice = cartData.reduce((acc, curVal) => 
    //   acc + curVal.price || curVal.defaultPrice, 0 )

    function handleRemoveFromCart(i){

      
      if (cartData.length > 1) {
        
        let newArray = [...cartData]
        newArray.splice(i, 1)
        // setCartData(newArray)
        dispatch(deleteItem(newArray))
        toast.success("Food removed")

        // localStorage.setItem("cartData", JSON.stringify(newArray))
      }else{
        handleclearCart()
      }
    }
      
      function handleclearCart(){
        dispatch(clearCart())
        toast.success("Cart is cleared")
        // setCartData([])
        // localStorage.setItem("cartData", JSON.stringify([]))
        // localStorage.clear()
    }

    const userData = useSelector((state) => state.authSlice.userData)


    function handlePlaceOrder(){
      if (!userData) {
          toast.error("Please Sign-in")
          dispatch(toggleLogin())
          return
      }
      toast.success("Orderd placed")
    }

        if (cartData.length === 0) {
            return <div className="w-full">
                <div className="w-[50%] mx-auto my-5">
             <h1 className="my-11"> Please add some think to cart.....</h1>
             <Link to={"/"} className="p-2 bg-orange-400">
             Click here to go to home page.
             </Link>
             </div>
             </div>
        }

  return  (
    <div className="w-full">
      
        <div className="w-[50%] mx-auto">


          <Link to={`/restaurantMenu/${resInfo.id}`}>
           <div className="flex gap-10 p-2 my-7">
            <img className="w-40 rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${resInfo.cloudinaryImageId}`} alt="" />
             <div><h1 className="text-4xl font-bold border-b-4 p-2">{resInfo.name}</h1>
                  <div className="flex flex-col mt-2.5">
                    <h3 className="font-semibold opacity-80">{resInfo?.slugs?.restaurant}</h3>
                  <h3 className="font-bold opacity-80">{resInfo?.slugs?.city}</h3>
                  </div>
             </div>
          </div>
          </Link>
        
          
        {
            cartData.map((data, i)=> (

              <div>
                <div className="flex justify-between w-full h-[170px] my-5 p-3 ">
                  <div className="w-[70%]">
                 
                     {data?.itemAttribute?.vegClassifier === "VEG" ? (
              <img
                className="w-[18px] h-[18px]"
                src="https://5.imimg.com/data5/SELLER/Default/2023/1/FC/HP/EV/74736417/plain-barcode-labels.jpeg"
                alt=""
              />
            ) : (
              <img
                className="w-[18px] h-[18px]"
                src="https://www.pngkit.com/png/detail/261-2619388_big-image-egg-veg-or-non-veg.png"
                alt=""
              />
            )}
                
                <h2 className="text-xl mt-2 font-bold opacity-75">{data.name}</h2>
                <p className="mt-2 text-xl font-semibold">₹{data.defaultPrice/100 || data.price/100 }</p>

                   {data?.ratings &&
                 <div className="flex gap-1 items-center">
                <i class="fi fi-ss-star text-green-600"></i>
                <p>
                  {data?.ratings?.aggregatedRating?.rating}..({data?.ratings?.aggregatedRating?.ratingCount})
                </p>
              </div>
              }
                </div>
                <div className="relative w-[22%] h-[150px]">
            <img
              className="rounded-2xl aspect-square "
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150,c_fit/${data.imageId}`}
              alt=""
            />
            <button onClick={() => handleRemoveFromCart(i)} className="text-[18px] drop-shadow border w-20 py-1 rounded-2xl text-red-600 font-bold border-red-600 bg-white absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-90">
              Remove
            </button>
          </div>
          </div>
          <hr className="opacity-65" />
          </div>
         
          ))
        }  
        <div className="flex justify-between my-5 items-center">
        <h1 className="font-bold text-2xl">Total :- ₹{totalPrice/100}</h1> 
        <button onClick={handlePlaceOrder } className="p-2 text-xl border border-black rounded-2xl bg-green-500 text-white">Place order </button>
        <button onClick={handleclearCart } className="p-2 text-xl border border-red-600 rounded-2xl bg-white font-semibold text-red-600">Clear cart</button>
        </div>
        </div>
    </div>)
}

export default Cart;
