import { filterChange } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = ({ filterChange }) =>{
    const handleChange = (event) => {
        const keyword = event.target.value
        filterChange(keyword)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(null, {filterChange})(Filter) 