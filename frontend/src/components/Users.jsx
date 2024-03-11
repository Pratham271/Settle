import { useEffect, useState } from "react"
import  Button  from "./Button"
import Avatar from "./Avatar";
import axios from "axios";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")

    //debouncing
    useEffect(()=> {
       try {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers: {
                authorization : "Bearer "+localStorage.getItem("token")
            }
        })
        .then((response)=> {
            setUsers(response.data.user)
        })
        .catch((error) => {
            if (error) {
                // console.log(error.response.status)
                // The request was made and the server responded with a status code
                console.log(error.response)
            }
        });
       } catch (error) {
            // alert(error.message)
            console.error("Error fetching users:");
       }
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <InputBox onChange={(e)=> setFilter(e.target.value)} placeholder={"Search users..."}/>
            {/* <input onChange={(e)=> setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input> */}
        </div>
        <div>
            {users.map((user,index) => <User user={user} key={index}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            {/* <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2"> */}
                {/* <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div> */}
                <Avatar label={user.firstName[0]}/>
            {/* </div> */}
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} label={"Send Money"} />
        </div>
    </div>
}