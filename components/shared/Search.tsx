'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const Search = () => {
  const router = useRouter()
  const search = useSearchParams()

  useEffect(() => {
    // Change the search field if parameter `q` or `tag` is present
    const val = search.get('q') || (search.get('tag') ? '#' + search.get('tag') : '');

    const searchField = document.getElementById('searchField')

    if (searchField && searchField.value != val) searchField.value = val
  }, [search])
  

  const handleSearch = (e) => {
    e.preventDefault()
    const q = e.target[0].value
    const qs = q.split(' ')

    // If the user wants to search for tag
    if (q[0] == '#' && qs.length == 1) {
      router.push(`/home?tag=${q.slice(1)}`)
      return
    }

    // Normal search
    router.push(`/home?q=${q}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <input className="pan d3" type="text" placeholder="Search ..." id='searchField' />
    </form>
  )
}

export default Search