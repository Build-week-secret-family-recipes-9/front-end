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

    const recipeSchema=yup.object().shape({
        Title: yup
        .string()
        .required('Recipe needs a title'),

        Source:yup
        .string()
        .required('Recipe needs a source'),

        Ingredients:yup
        .string()
        .required('Recipe needs at least one ingredient'),

        Instructions:yup
        .string()
        .required('Recipe needs instructions'),

        Category:yup
        .string()
        .required('Recipe needs a category'),

        Img:yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'),
    });

    recipeSchema
    .isValid({
        Title:'Apples',
        Source:'Grandma',
        Ingredients:'4-6 Apples',
        Instructions:'Slice apples, removing the core and stem. Serve apples on a plate',
        Category:'Snack',
        Img:'https://th.bing.com/th/id/R0bfc9b8b90712940018a452f9cadb9dd?rik=rAeASh9rTmhBqg&riu=http%3a%2f%2flifeinleggings.com%2fwp-content%2fuploads%2f2013%2f09%2fapples-slices-1024x806.jpg&ehk=BpEjfxAdcU9luSjh0U5mN4dh3uCJqG5ngTjvZavuNZk%3d&risl=&pid=ImgRaw',
    });

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