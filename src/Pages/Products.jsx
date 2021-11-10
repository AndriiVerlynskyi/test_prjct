import React from 'react'
import AddNewProductBlock from '../Components/AddNewProductBlock'
import ProductsList from '../Components/ProductsList'
import SortDropdown from '../Components/SortDropdown'

const Products = () => {
    return (
        <>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <AddNewProductBlock/>
                <SortDropdown/>
            </div>
            <ProductsList/>
        </>
    )
}

export default Products


