import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Modal } from "antd";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visiblility, setVisiblility] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.post("http://localhost:8000/api/v1/category/create-category", {name});
        if (data?.success) {
            toast.success(`${name} is created`);
            getAllCategory();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        console.log(error);
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
        const { data } = await axios.get("http://localhost:8000/api/v1/category/get-category");
        if (data?.success) {
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.put(
            `http://localhost:8000/api/v1/category/update-category/${selected._id}`,
            { name: updatedName }
        );
        if (data?.success) {
            toast.success(`${updatedName} is updated`);
            setSelected(null);
            setUpdatedName("");
            setVisiblility(false);
            getAllCategory();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        console.log(error);
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
        const { data } = await axios.delete(
            `http://localhost:8000/api/v1/category/delete-category/${pId}`
        );
        if (data.success) {
            toast.success(`category is deleted`);

            getAllCategory();
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        toast.error("Something went wrong");
        }
    };
    return ( 
        <Layout title={'Dashboard - Create Category'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories?.map((category) => (
                                    <>
                                    <tr>
                                        <td key={category._id}>{category.name}</td>
                                        <td>
                                        <button
                                            className="btn btn-primary ms-2"
                                            onClick={() => {
                                              setVisiblility(true);
                                              setUpdatedName(category.name);
                                              setSelected(category);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger ms-2"
                                            onClick={() => {
                                              handleDelete(category._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        </td>
                                    </tr>
                                    </>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setVisiblility(false)}
                            footer = {null}
                            open = {visiblility}
                        >
                           <CategoryForm
                            value={updatedName} 
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div> 
            </div>
        </Layout>
    )
}

export default CreateCategory