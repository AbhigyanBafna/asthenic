import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ( {user} ) => {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const isImageTypeValid = (file) => {
    return (
      file.type === "image/png" ||
      file.type === "image/svg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff"
    );
  };

  const uploadImageToSanity = (file) =>
    client.assets
      .upload("image", file, {
      contentType: file.type,
      filename: file.name}
    );

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];

    if (isImageTypeValid(selectedFile)) {
      setLoading(true);
      setWrongImageType(false);
      uploadImageToSanity(selectedFile)
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const fieldsMissing = () =>
    !title || 
    !about || 
    !imageAsset?._id ||
    !category;
  
  const savePin = () => {
    if (fieldsMissing()) {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    } else {
      createPin();
    }
  };

  const createPin = () => {
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: "postedBy",
        _ref: user._id,
      },
      category,
    };

    client.create(doc)
      .then(() => {
      setTimeout(() => {
        navigate("/"); // Create pin and navigate to home page
      }, 3000);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
             {loading && <Spinner />}
             {wrongImageType && <p>It&apos;s a wrong file type.</p>}
             {!imageAsset ? (
                <label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, JPEG, SVG, PNG, GIF less than 20MB
                  </p>
                  <input
                  type="file"
                  id="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="h-0 w-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-100 p-3 text-xl outline-none transition-all duration-500 ease-in-out hover:shadow-md"
                    onClick={() => setImageAsset(null)}
                  >
                      <MdDelete />
                  </button>
                </div>
              )}
          </div>
        </div>

        <div className="mt-5 flex w-full flex-1 flex-col gap-6 lg:pl-5">
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Set title
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />

          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}

          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)} // Set about
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <input
            type="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a url"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div>
            <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex items-end justify-end gap-3">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-28 rounded-full bg-black p-2 font-bold text-white outline-none"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={savePin}
                className="w-28 rounded-full bg-red-500 p-2 font-bold text-white outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePin