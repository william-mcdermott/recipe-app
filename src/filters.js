// Set up filters default object
const filters = {
  searchText: '',
}

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = ({ searchText }) => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText
  }
}

// Make sure to set up the exports
export { getFilters, setFilters }
