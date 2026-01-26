import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";
import RestaurantMenu from "./components/RestaurantMenu";
import {
  CartContext,
  Coordinate,
  Title,
  Visibility,
} from "./context/contextApi";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import SigninPage from "./components/SigninBtn";
import Search from "./components/Search";

function App() {
  // const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({lat: 28.7040592,lng: 77.10249019999999});
  const [title, setTitle] = useState({title1: "Top restaurant chains in Delhi",title2: "Restaurants with online food delivery in Delhi",});
  // const [cartData, setCartData] = useState([]);

  const visible = useSelector((state => state.toggleSlice.searchToggle)) 
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle)


  // function get_Data_From_Local_Storage(){
  //   let data = JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data)
  // }

  // useEffect(()=>{
  //   get_Data_From_Local_Storage()
  // },[])

  return (
    // <CartContext.Provider value={{ cartData, setCartData }}>
      <Title.Provider value={{ title, setTitle }}>
        <Coordinate.Provider value={{ coord, setCoord }}>
          {/* <Visibility.Provider value={{ visible, setVisible }}> */}
            <div className={visible || loginVisible ? "overflow-hidden max-h-screen" : ""}>
              <Routes>
                <Route path="/" element={<Head />} >
                  <Route path="/" element={<Body />} />
                  <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
                  <Route path="/cart" element={<Cart/>} />
                  <Route path="/search" element={<Search/>} />
                  <Route path="*" element={<h1>Coming soon.....</h1>} />
                </Route>
              </Routes>
            </div>
          {/* </Visibility.Provider> */}
        </Coordinate.Provider>
      </Title.Provider>
    // </CartContext.Provider>
  );
}

export default App;
