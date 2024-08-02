import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spin";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const handleDeleteBook =() => {
        setLoading(true);
        axios.delete(`https://books-management-system-iwug.onrender.com/books/${id}`)
       .then(()=>{
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
       })
       .catch(err => {
        setLoading(false);
        enqueueSnackbar("Failed to delete book. Please try again later", { variant: "error" });  // Show error message in case of failure to delete the book  // Error handling code goes here  // Uncomment the following lines and add error handling code when necessary  // if (err.response && err.response.status === 404) { // enqueueSnackbar("Book not found", { variant: "error" }); // } else if (err.response && err.response
        console.log(err);
       })
    }
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Delete Book</h1>
        {loading ? <Spinner />:""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
      
        <h3 className="text-2xl">Are you Sure You want to delete the book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes,Delete it</button>
    </div></div>
  )
}

export default DeleteBook