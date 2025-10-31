// import { createContext, useState, useEffect, useContext } from "react"
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'
// import toast from "react-hot-toast";


// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

// const AppContext=createContext()

// export const AppProvider=({children})=>{
    
//     const navigate=useNavigate()
//     const [token, setToken]=useState(null)
//     const [blogs, setBlogs]=useState([])
//     const [input, setInput]=useState("")

//     const fetchBlogs=async()=>{
//         try{
//             const {data}=await axios.get('/api/blog/all');
//             data.success? setBlogs(data.blogs): toast.error(data.message)
//         }
//         catch(error){
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         fetchBlogs();
//         const storedToken = localStorage.getItem('token');
//         if(storedToken){
//             setToken(storedToken);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//         }
//     },[])
    

//     const value={
//         axios,navigate,token,setToken,blogs,setBlogs,input,setInput
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext=()=>{
//     return useContext(AppContext)
// };



import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Load token first
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  // ✅ Fetch blogs only after token is set
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blog/all");
        data.success ? setBlogs(data.blogs) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchBlogs();
  }, [token]); // ← depends on token

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
