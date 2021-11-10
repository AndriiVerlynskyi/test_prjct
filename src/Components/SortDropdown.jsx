import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import { sortProductsByAlphabet, sortProductsByCount } from '../Redux/actions/fetchProducts';

const SortDropdown = () => {
    
    const dispatch = useDispatch();
    
    const [isActive, setIsActive] = useState({
        sortedByAlphabetIsActive: true,
        sortedByCountIsActive: false
    })

    const sortedBy = useSelector( state => state.productsData.sortedBy);

    useEffect(() => {
        if (sortedBy === 'alphabet'){
            setIsActive({
                sortedByAlphabetIsActive: true,
                sortedByCountIsActive: false
            })
        } else if (sortedBy === 'count'){
            setIsActive({
                sortedByAlphabetIsActive: false,
                sortedByCountIsActive: true
            })
        }
    }, [sortedBy])

    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="sort-dropdown">
                Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item  
                active={isActive.sortedByAlphabetIsActive}
                onClick={ () => {
                    dispatch(sortProductsByAlphabet())
                }}>Sort by alphabet</Dropdown.Item>
                <Dropdown.Item 
                active={isActive.sortedByCountIsActive}
                onClick={ () => {
                    dispatch(sortProductsByCount())
                }}>Sort by count</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortDropdown
