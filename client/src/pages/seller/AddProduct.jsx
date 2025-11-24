import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');


    const handleFileChange = (e, index) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files[0];
        setFiles(newFiles);
    };

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            const { data } = await axios.post('/api/product/add', formData);
            if (data.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }

        if (files.length === 0 || !files[0]) {
            alert('Please upload at least one product image');
            return;
        }

        if (!category) {
            alert('Please select a category');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('offerPrice', offerPrice);

        files.forEach((file, index) => {
            if (file) {
                formData.append(`image${index}`, file);
            }
        });

        try {
            console.log('Form Data:', {
                name,
                description,
                category,
                price,
                offerPrice,
                images: files.length
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="relative">
                                <input
                                    onChange={(e) => handleFileChange(e, index)}
                                    type="file"
                                    id={`image${index}`}
                                    accept="image/*"
                                    hidden
                                />
                                <img
                                    className="max-w-24 cursor-pointer border-2 border-gray-300 rounded-lg hover:border-[#24a47c] transition-colors"
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea"
                                    width={100}
                                    height={100}
                                />

                                {files[index] && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const updatedFiles = [...files];
                                            updatedFiles[index] = null;
                                            setFiles(updatedFiles);
                                        }}
                                        className="absolute -top-2 -right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs bg-[#24a47c] hover:bg-[#1e8c69]"
                                    >
                                        ✕
                                    </button>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 focus:border-[#24a47c] transition-colors"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="product-description"
                        rows={4}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none focus:border-[#24a47c] transition-colors"
                        placeholder="Type here"
                    ></textarea>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 focus:border-[#24a47c] transition-colors"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            id="product-price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 focus:border-[#24a47c] transition-colors"
                            required
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input
                            onChange={(e) => setOfferPrice(e.target.value)}
                            value={offerPrice}
                            id="offer-price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 focus:border-[#24a47c] transition-colors"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#24a47c] text-white font-medium rounded hover:bg-[#1e8c69] transition-colors cursor-pointer"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
