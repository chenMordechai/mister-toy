
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const PAGE_SIZE = 3

export const toyService = {
    query,
    getById,
    save,
    remove,
    // getEmptyToy,
    getDefaultFilter,
    // getDefaultSort
}


function query(filterBy = {}, sortBy = {}) {

    return storageService.query(STORAGE_KEY)

    // .then(toys => {
    //     const toysData ={
    //         allToysCount : toys.length,
    //         doneToysCount : toys.filter(t=>t.isDone).length,
    //         toysToDisplay:[],
    //         pageCount:0
    //     }
    //     let toysToDisplay = toys.slice()
    //     if (filterBy.txt) {
    //         const regExp = new RegExp(filterBy.txt, 'i')
    //         toysToDisplay = toysToDisplay.filter(t => regExp.test(t.txt))
    //     }

    //     if (filterBy.status !== undefined && filterBy.status !== 'all') {
    //         toysToDisplay = toys.filter(t => t.isDone && filterBy.status === 'done'
    //         || !t.isDone && filterBy.status === 'active')
    //     }

    //     if (sortBy.type) {
    //         toysToDisplay.sort(((t1, t2) => t1.txt.localeCompare(t2.txt) * sortBy.des))
    //     }
    //     const pageCount = Math.ceil(toysToDisplay.length / PAGE_SIZE)
    //     if (filterBy.pageIdx !== undefined) {
    //         let start = filterBy.pageIdx * PAGE_SIZE // 0 , 3 , 6 , 9
    //         toysToDisplay = toysToDisplay.slice(start, start + PAGE_SIZE)
    //     }
    //     toysData.pageCount = pageCount
    //     toysData.toysToDisplay = toysToDisplay
    // return toysData
    // })
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)

}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
            .then((savedToy) => {
                return savedToy
            })
    } else {
        return storageService.post(STORAGE_KEY, toy)
            .then((savedToy) => {
                return savedToy
            })
    }
}

function getEmptyToy() {
    return {
        txt: '',
        isDone: false,
    }
}

function getDefaultFilter() {
    return { txt: '', status: 'all', pageIdx: 0 }
}
function getDefaultSort() {
    return { type: '', des: false }
}

const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}
