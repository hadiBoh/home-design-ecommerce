const reducer = (state, action) => {

    if (action.type === "getdata") {
        return { ...state, data: action.payload }
    }
    if (action.type === "filterd") {
        return { ...state, filteredData: action.payload.sort((a,b)=> a.price - b.price) }
    }

    if (action.type === "updateSort") {
        return {...state , sort:action.payload}
    }

    if (action.type === "updateFilter") {
        const { name, value } = action.payload
        return { ...state, filters: { ...state.filters, [name]: value } }
    }

    if (action.type === "filter") {
        const { data } = state
        const { search, category, company, color, range, shipping } = state.filters
        let tempFilterd = [...data]

        tempFilterd = tempFilterd.filter(item => Number(item.price.toString().slice(0, item.price.toString().length - 2)) <= range)

        if (search) {
            tempFilterd = tempFilterd.filter(item => item.name.toLowerCase().startsWith(search))
        }
        if (category !== "all") {
            tempFilterd = tempFilterd.filter(item => item.category === category)
        }
        if (company !== "all") {
            tempFilterd = tempFilterd.filter(item => item.company === company)
        }
        if (color !== "all") {
            tempFilterd = tempFilterd.filter(item => item.colors.some(clr => clr === color))
        }
        if (shipping) {
            tempFilterd = tempFilterd.filter(item => item.shipping === shipping)
        }
        return { ...state, filteredData: tempFilterd }
    }

    if (action.type === "grid") {
        return { ...state, grid: "sidebyside" }
    }
    if (action.type === "block") {
        return { ...state, grid: "block" }
    }

    if (action.type === "sortFilter") {
        const {filteredData , sort} = state
        let tempNavFilter = []
        switch (sort) {
            case "price lowest":
                tempNavFilter = filteredData.sort((a,b)=> a.price - b.price)
                break
            case "price highest":
                tempNavFilter = filteredData.sort((a,b)=> b.price - a.price)
                break
            case "name (a-z)":
                tempNavFilter = filteredData.sort((a,b)=> a.name.localeCompare(b.name))
                break
            case "name (z-a)":
                tempNavFilter = filteredData.sort((a,b)=> b.name.localeCompare(a.name))
                break
        }
        return {...state , filteredData : tempNavFilter }
    }

    if (action.type === "singleProduct") {
        return{...state , singleProduct: action.payload , loading: false}
    }
    if (action.type === "setId") {
        return{...state , id: action.payload}
    }
    if (action.type === "err") {
        return{...state , err: "network err"}
    }
    if (action.type === "clear") {
        return{...state , singleProduct: null , loading:true}
    }
    if (action.type === "deleteFilter") {

        const item = {
            search: "",
            category: "all",
            company: "all",
            color: "all",
            range: 10000,
            shipping: "",
        }
        return { ...state, filters: item }
    }


}

export default reducer