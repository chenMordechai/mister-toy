import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cpms/ToyList.jsx'



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .catch(err => {
                console.log('err:', err)
            })
    }




    return (
        <section className="toy-index">
            <h2>Toy Index</h2>
            <button>Add Toy</button>
            {isLoading && 'Loading..'}
            {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}


        </section>
    )
}