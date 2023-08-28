import React, { useState } from "react";
import { statuses } from "../utils/styles";
import Spinner from "./Spinner";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { storage } from "../config/firebase.config";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
  alertWarning,
} from "../context/actions/alertActions";
import { addNewProduct } from "../api";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const dispatch = useDispatch();
  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setisLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded to Cloud"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };
  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setisLoading(false);
      dispatch(alertSuccess("Image deleted from Cloud"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };
  const submitNewData = () => {
    if (
      itemName === "" ||
      category === null ||
      price === "" ||
      imageDownloadURL === ""
    ) {
      dispatch(alertWarning("Please fill in all fields"));
    } else if (price >= 51 || price <= 0) {
      dispatch(alertWarning("Please choose an appropriate price"));
    } else {
      const data = {
        product_name: itemName,
        product_category: category,
        product_price: price,
        imageURL: imageDownloadURL,
      };
      addNewProduct(data).then((res) => {
        console.log(res);
        dispatch(alertSuccess("New Item added"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setImageDownloadURL(null);
        setItemName("");
        setPrice("");
        setCategory(null);
      });
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputField
          type="text"
          placeHolder="Enter Item Name..."
          stateFunc={setItemName}
          stateValue={itemName}
          maxLength={300}
        />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-orange-400 text-white"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <InputField
          type="number"
          placeHolder="Item price here"
          stateFunc={setPrice}
          stateValue={price}
          max={50}
          min={0}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-orange-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-gray-100 transition-all duration-300">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className=" w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className=" w-full h-full object-cover"
                      alt="loading..."
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out text-white"
                      onClick={deleteImage}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-9/12 py-2 rounded-md bg-orange-400 text-primary hover:bg-emerald-500 cursor-pointer"
        >
          SAVE
        </motion.button>
      </div>
    </div>
  );
};

export const InputField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
  maxLength,
  max,
  min,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-orange-400 text-lg"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
        maxLength={maxLength}
        max={max}
        min={min}
      />
    </>
  );
};

export default DBNewItem;
