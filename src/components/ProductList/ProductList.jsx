
import { useEffect, useState } from "react";

import "./ProductList.scss";

import axios from "axios";
import { BE_URL } from "../../variable";
import ProductCard from "../ProductCard/ProductCard";

import { toastError } from "../../common/common";

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filterProvider, setFilterProvider] = useState(0);
    const [filterCategory, setFilterCategory] = useState(0);
    const [filterPrice, setFilterPrice] = useState('');

    const handleProviderChange = async (e) => {
        setFilterProvider(parseInt(e.target.value));
    };

    const handleCategoryChange = async (e) => {
        setFilterCategory(parseInt(e.target.value));
    };

    const handlePriceChange = async (e) => {
        setFilterPrice(parseInt(e.target.value));
    };

    const submitForm = e => {
        e.preventDefault();
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/products/categories`);
            data && setCategories(data);
        } catch (error) {
            toastError(error);
        }
    }

    const getAllProviders = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/products/providers`);
            data && setProviders(data);
        } catch (error) {
            toastError(error);
        }
    }
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${BE_URL}/products?${filterProvider?`provider=${filterProvider}&`:``}${filterCategory?`category=${filterCategory}&`:``}${filterPrice?`price=${filterPrice}`:``}`);
            data && setProducts(data);
        } catch (error) {
            toastError(error);
        }
    }

    useEffect(() => {
        getAllCategories();
        getAllProviders();
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [filterProvider, filterCategory, filterPrice])

    return (
        <div className="Product-Container">
            <h1 className="title">Các sản phẩm</h1>
            <form className="Form-Filter" onSubmit={submitForm}>
                <div className="filter-container">
                    <div className="filter-label">
                        <label>Hãng</label>
                        <select value={filterProvider} onChange={handleProviderChange}>
                            <option value={0}>Tất cả</option>
                            {providers.map((p) => <option key={p.ID} value={p.ID}>{p.Ten}</option>)}
                        </select>
                    </div>

                    <div className="filter-label">
                        <label>Loại sản phẩm</label>
                        <select value={filterCategory} onChange={handleCategoryChange}>
                            <option value={0}>Tất cả</option>
                            {categories.map((p) => <option key={p.ID} value={p.ID}>{p.Ten}</option>)}
                        </select>
                    </div>

                    {/* <div className="filter-label">
                        <label>Giá</label>
                        <input
                            type="number"
                            min={0}
                            value={filterPrice}
                            onChange={handlePriceChange}
                            placeholder="Chọn giá tối đa"
                        />
                    </div> */}
                    {/* <div className="submit filter-label">
                    <span></span>
                    <input className="Filter-Button" type="submit" value='Lọc'/>
                    </div> */}
                </div>
            </form>
            <div className="Product-List">
                {products.map((product) => <ProductCard key={product.ID} {...product} />)}
            </div>
        </div>
    );
}

export default ProductList;