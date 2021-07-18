import React, { useState } from "react"

const Search: React.FC = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="search position-relative me-4">
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="検索"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
