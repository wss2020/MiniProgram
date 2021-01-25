export function SearchBar(props) {

    function handleFilterTextChange(e) {
        props.onFilterTextChange(e.target.value);
    }

    function handleInStockChange(e) {
        props.onInStockChange(e.target.checked);
    }

    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={handleFilterTextChange}
            />
            <p>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={handleInStockChange}
                />
                {' '}
                Only show products in stock
            </p>
        </form>
    );
}




