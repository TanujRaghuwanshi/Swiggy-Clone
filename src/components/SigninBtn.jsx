import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../config/firebaseAuth"
import { useDispatch, useSelector } from "react-redux"
import { addUserData, removeUserData } from "../utils/authSlice"
import { useNavigate } from "react-router-dom"
import { toggleLogin } from "../utils/toggleSlice"


function SigninBtn(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)

  async  function handleAuth(){
    let data = await signInWithPopup(auth, provider)
    const userData = {
        name : data.user.displayName,
        photo : data.user.photoURL
    }
    dispatch(addUserData(userData))
    dispatch(toggleLogin())
    navigate("/")
    }

    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(toggleLogin())
    }

    return (
        <>
           {
            !userData &&
           <button onClick={handleAuth} className="w-full font-bold text-2xl bg-orange-400 text-white py-2">Login with Google</button>
        
           }

            {
                userData &&
           <button onClick={handleLogout} className="w-full font-bold text-2xl bg-orange-400 text-white py-2">Logout</button>
            }
        </>
    )
}

export default SigninBtn