import { createContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

export const DataFetch = createContext()
const max_price = 10000
const DataFetchProvider = (props) => {

  const initial = {
    data: [],
    filteredData: [],
    filters: {
      search: "",
      category: "all",
      company: "all",
      color: "all",
      range: max_price,
      shipping: "",
      currentId: "",
      singleProduct: null,
      id: "",
      loading:false,
      err:""
    },
    grid: "sidebyside",
    sort: "price lowest"
  }
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    state.err = ""
    async function getProducts() {
      try {
        const response = await fetch("https://course-api.com/react-store-products")
        if (!response.ok) throw Error("network error!")
        const result = await response.json()
        dispatch({ type: "getdata", payload: result })
        dispatch({ type: "filterd", payload: result })
      } catch (err) {
        dispatch({type:"err"})
      }
    }
    getProducts()
  }, [])


  useEffect(() => {
    dispatch({type:"clear"})
    const getProduct = async () => {
      try{
        const id = state.id
        const res = await fetch("https://course-api.com/react-store-single-product?id="+id)
        if(!res.ok) throw Error ("net error")
        const result = await res.json()
        dispatch({ type: "singleProduct", payload: result })
      }catch(err){
        dispatch({type:"err"})
      }

      
    }
    getProduct()
  }, [state.id])

  function setId(id) {
    dispatch({ type: "setId", payload: id })
  }


  useEffect(() => {
    dispatch({ type: "filter" })
    dispatch({ type: "sortFilter" })
  }, [state.filters, state.sort])
  //dont like switch case
  function filter(e) {
    e.preventDefault()
    let value = null
    let name = e.target.name
    if (e.target.name === "search") {
      value = e.target.value
    }
    if (e.target.name === "category") {
      removeActive(e)
      value = e.target.id
    }
    if (e.target.name === "company") {
      value = e.target.value
    }
    if (e.target.name === "color") {
      removeActive(e)
      value = e.target.id.toLowerCase()
    }
    if (e.target.name === "range") {
      value = parseInt(e.target.value)
    }
    if (e.target.name === "shipping") {
      value = e.target.checked
    }


    dispatch({ type: "updateFilter", payload: { name, value } })

  }

  function navFilter(e) {
    if (e.target.name === "dFilter") {
      dispatch({ type: "deleteFilter" })
    }
    if (e.target.parentElement.name === "showgrid") {
      dispatch({ type: "grid" })
    }
    if (e.target.parentElement.name === "showblock") {
      dispatch({ type: "block" })
    }
    if (e.target.name === "option-filter") {
      const value = e.target.value.toLowerCase()
      dispatch({ type: "updateSort", payload: value })
    }
  }

  function removeActive(e) { // just because i was lazy herrrrrre :))))
    document.querySelectorAll("#catagory-btn button").forEach(btn => btn.classList.remove("active"))
    document.querySelectorAll(".color-btn-wrapper button").forEach(btn => btn.classList.remove("active"))
    e.target.classList.add("active")
  }
  function handleprice(item) {

    let res = null
    const len = item.price.toString().length
    if (len === 6) {
      res = item.price.toString().replace(/^(\d{4})(.*)/ig, '$1.$2')
    }
    if (len === 5) {
      res = item.price.toString().replace(/^(\d{3})(.*)/ig, '$1.$2')
    }
    if (len === 4) {
      res = item.price.toString().replace(/^(\d{2})(.*)/ig, '$1.$2')
    }
    return res
  }

  return (
    <DataFetch.Provider value={{
      ...state,
      handleprice,
      filter,
      navFilter,
      setId,
      dispatch,
    }}>
      {props.children}
    </DataFetch.Provider>
  )
}


export default DataFetchProvider 
