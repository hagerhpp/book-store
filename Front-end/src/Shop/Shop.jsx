import React from 'react'
import {useQuery} from '@tanstack/react-query'
import BookCard from '../components/BookCard/BookCard'
const Shop = () => {
    const {isLoading, data, error} = useQuery({
        queryKey: ['shop-main'],
        queryFn: getBooksData
    })

    async function getBooksData(){
        const response = await fetch('/public/shopData.json')
        if (!res.ok) throw new Error("Failed to fetch books");
        return response.json()
    }
  return (
    <div>
    <h1>Bookstore</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((book) => (
       <BookCard book={book}/>
      ))}
    </div>
  </div>
  )
}

export default Shop