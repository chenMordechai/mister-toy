
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

import { SET_IS_LOADING } from "../store/reducers/toy.reducer";
import { saveToy } from '../store/actions/toy.actions.js'


export function ToyEdit() {

    const dispatch = useDispatch()

    const [toyToEdit, setToyToEdit] = useState(null)

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        dispatch({ type: SET_IS_LOADING, isLoading: true })
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
            .finally(() => {
                dispatch({ type: SET_IS_LOADING, isLoading: false })
            })
    }

    function handleChange(ev) {
        let { value, name, type } = ev.target
        if (type === 'number') value = +value
        else if (type === 'checkbox') value = ev.target.checked
        console.log('value:', value)

        setToyToEdit(prevToy => ({ ...prevToy, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        saveToy({ ...toyToEdit })
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!toyToEdit) return ''
    return (
        <section className="toy-edit">
            <h2>Toy Edit</h2>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={toyToEdit.name} type="text" id="name" name="name" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={toyToEdit.price} type="number" id="price" name="price" />

                <label htmlFor="inStock">In Stock?</label>
                <input onChange={handleChange} checked={toyToEdit.inStock} type="checkbox" id="instock" name="inStock" />

                <button>Save</button>
            </form>

            <button><Link to="/toy">Back</Link></button>
        </section>
    )
}