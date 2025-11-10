import { createContext, useState,useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const [user, setUser] = useState(false);
    const [showLogin,setShowLogin]=useState(false);
    const[token,setToken]=useState(localStorage.getItem('token'));
    const [credit,setCredit]=useState(false);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadCreditData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(data.success){
                setCredit(data.credits);
                setUser(data.user);
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.error(error);
            toast.error(error.message)
            
        }
    }

    const generateImg = async (prompt)=>{
        try {
           const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(data.success){
                loadCreditData();
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditData()
                if(data.creditBalance === 0){
                    navigate('/credit')

                }
            }
            
        } catch (error) {
            toast.error(error.message)          
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setUser(false);
        setToken(null);
        setCredit(false);
        toast.success("Logged Out Successfully")
    }

    useEffect(()=>{
        if(token){
            loadCreditData();
        }
    },[token])

    const value = {
      user,
      setUser,
      setShowLogin,
      showLogin,
      token,
      setToken,
      credit,
      setCredit,
      backendUrl,
      loadCreditData,
      logout,
      generateImg
    };
    
    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>;
}
export const useAppContext = () => useContext(AppContext);