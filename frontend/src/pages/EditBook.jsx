import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spin";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisherYear, setPublisherYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setPublisherYear(response.data.publisherYear);
                setTitle(response.data.title);
                setLoading(false);
                enqueueSnackbar("Maa chud gyi!",{variant : 'success'})
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error happened: " + error.message, { variant: "error" });
                console.log(error);
            });
    }, [id]);

    const handleEditBook = (e) => {
        e.preventDefault();
        const data = {
            title,
            author,
            publisherYear
        };
        setLoading(true);
        axios.put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book updated successfully", { variant: "success" });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error updating book", { variant: "error" });
                console.error('Error:', error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ""}
            <form onSubmit={handleEditBook} className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="number"
                        value={publisherYear}
                        onChange={(e) => setPublisherYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button type="submit" className="p-2 bg-sky-300 m-8">Save</button>
            </form>
        </div>
    );
};

export default EditBook;
