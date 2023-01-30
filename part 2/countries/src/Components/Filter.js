const Filter = ({ setFilter }) => {
    const onChange = (event) => {
        setFilter(event.target.value.toLowerCase().trim())
    }

    return (
        <div>
            find countries <input type="text" onChange={onChange} name="search" />
        </div>
        
    )
}

export default Filter