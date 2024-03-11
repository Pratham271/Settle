import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import { Users } from '../components/Users'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [userBalance, setuserBalance] = useState(0)
  useEffect(()=> {
    try {
        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=> {
            if(response.status!==200){
                navigate('/')
            }
            else{
              // setFirstName(response.data.firstName)
              setFirstName(response.data.firstName)
            }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate('/');
        });
    } catch (error) {
        // console.log(error.message)
    }
},[])

useEffect(()=> {
  try {
    axios.get("http://localhost:3000/api/v1/account/balance", {
      headers: {
        authorization : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response)=> {
        setuserBalance(response.data.balance)
    })
    .catch((e)=> {

    })
  } catch (error) {
    
  }
})

const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/")
}
  return (
    <div>
        <Appbar firstName={firstName} onClick={handleLogout}/>
        <div className="m-8">
            <Balance value={userBalance} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard
