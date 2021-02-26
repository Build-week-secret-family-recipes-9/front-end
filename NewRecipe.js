import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const NewRecipe = () => {

    const [formState, setFormState] = useState({
        Title: '',
        Source: '',
        Ingredients: '',
        Instructions: '',
        Category: '',
        Img: ''
    })

    const changeHandler = event => {
        event.persist()
        const FormData = {
            ...formState,
            [event.target.name]: event.target.value
        }
        setFormState(FormData)
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor='img'>
                Image
            <input 
                id='img'
                type='text'
                name='img'
                value={formState.Img}
                onChange={changeHandler}
            /> 
            </label>
            <label htmlFor='title'>
                Title
            <input 
                id='title'
                type='text'
                name='title'
                value={formState.Title}
                onChange={changeHandler}
            /> 
            </label>
            <label htmlFor='source'>
                Source
            <input 
                id='source'
                type='text'
                name='source'
                value={formState.Source}
                onChange={changeHandler}
            /> 
            </label>
            <label htmlFor='ingredients'>
                Ingredients
            <input 
                id='ingredients'
                type='text'
                name='ingredients'
                value={formState.Ingredients}
                onChange={changeHandler}
            /> 
            </label>
            <label htmlFor='instructions'>
                Instructions
            <input 
                id='instructions'
                type='text'
                name='instructions'
                value={formState.Instructions}
                onChange={changeHandler}
            /> 
            </label>
            <label htmlFor='category'>
                Category
            <input 
                id='category'
                type='text'
                name='category'
                value={formState.Category}
                onChange={changeHandler}
            /> 
            </label>
            <button type='submit'>Submit Recipe!</button>
        </form>
    )
}

export default NewRecipe;