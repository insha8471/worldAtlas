
export const SearchFilter = ({
    search,
    setSearch,
    filter,
    setFilter,
    countries,
    setCountries
}) => {

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    }

    const handleSelectChange = (event) => {
        setFilter(event.target.value)
    }

    const sortCountries = (value) => {
        const sortCountry = [...countries].sort((a,b) => {
            return value === 'asc'
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        })
        setCountries(sortCountry)
    }

    return (
        <section className="section-searchFilter container">
            <div>
                <input 
                    type="text" 
                    placeholder="search"
                    value={search}
                    onChange={handleSearchInput}
                />
            </div>

            <div>
                <button onClick={() => sortCountries("asc")}>Asc</button>
            </div>

            <div>
                <button onClick={() => sortCountries("des")}>Desc</button>
            </div>

            <div>
                <select
                className="select-section sear"
                value={filter}
                onChange={handleSelectChange}
                >
                <option value="all">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                </select>
            </div>
        </section>
    )
}