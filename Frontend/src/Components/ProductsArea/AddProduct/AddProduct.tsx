import "./AddProduct.css";
import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";
import { useNavigate } from "react-router-dom";
import productsService from "../../../Services/ProductsService";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";

function AddProduct(): JSX.Element {

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!authService.isLoggedIn()) {
    //         alert("You are not logged in");
    //         navigate("/login");
    //     }
    // }, []);

    const { register, handleSubmit, formState } = useForm<ProductModel>();

    async function submit(product: ProductModel) {
        try {
            const addedProduct = await productsService.addProduct(product);
            alert("Product has been added. id: " + addedProduct.id); // In real life - never show ids to the user.
            navigate("/products");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddProduct Box">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>Name: </label>

                {/* Native Validation:  */}
                {/* <input type="text" {...register("name")} required minLength={3} maxLength={100} /> */}

                {/* useForm Validation: */}
                <input type="text" {...register("name", {
                    required: { value: true, message: "Missing name" },
                    minLength: { value: 3, message: "Name must be minimum 3 chars" },
                    maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.name?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed $1000" }
                })} step="0.01" />
                <span>{formState.errors.price?.message}</span>

                <label>Stock: </label>
                <input type="number" {...register("stock", {
                    required: { value: true, message: "Missing stock" },
                    min: { value: 0, message: "Stock can't be negative" },
                    max: { value: 10000, message: "Stock can't exceed 10000" },
                    validate: { value: stock => stock % 2 === 0 || "Stock must be even" }
                })} />
                <span>{formState.errors.stock?.message}</span>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" }
                })} />
                <span>{formState.errors.image?.message}</span>

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
