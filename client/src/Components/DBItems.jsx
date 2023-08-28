import React, { useEffect } from "react";
import { DataTable, Spinner } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts } from "../api";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/actions/alertActions";
import { setAllProducts } from "../context/actions/productActions";
const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  });
  if (!products) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
                alt="loading..."
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-center">
                {(() => {
                  const productPrice = parseFloat(rowData.product_price);
                  const formattedPrice = productPrice.toFixed(3);

                  return (
                    <span>
                      <span className="text-orange-500"> K.D </span>{" "}
                      {formattedPrice}
                    </span>
                  );
                })()}
              </p>
            ),
          },
        ]}
        data={Array.isArray(products) ? products : []}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Product",
            onClick: (event, rowData) => {
              dispatch(
                alertDanger(
                  "Can't edit " + rowData.productId + " at this time)"
                )
              );
              setInterval(() => {
                dispatch(alertNULL());
              }, 3000);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Product",
            onClick: (event, rowData) => {
              if (window.confirm("Are you sure you want to delete product?")) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted "));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
