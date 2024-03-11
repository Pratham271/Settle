import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    let navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=> {
        try {
            axios.get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response)=> {
                if(response.status==200){
                    navigate('/dashboard')
                }
            })
            .catch((e)=> {
                // console.log("user not signed in")
            })
        } catch (error) {
            // console.log(error.message)
        }
    },[])
    const handleSignup = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstName,
            lastName,
            username,
            password
        })
            if(response.status===201){
                navigate("/signin")
            }
            else{
                alert("signup failed")
            }
        } catch (error) {
            alert(error.message)
        }
    }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-96  text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <Subheading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="johndoe@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} type={"password"}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick={handleSignup}/>
        </div>
        <BottomWarning label={"Already have an account?"} innerText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  )
}

export default Signup
