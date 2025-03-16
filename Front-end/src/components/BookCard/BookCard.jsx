import React from 'react'

const BookCard = ({book}) => {
  return (
    <div key={book.id} className="border p-4">
          <img src={book.image} alt={book.title} className="w-full h-40 object-cover"/>
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-xl font-bold">${book.price.toFixed(2)}</p>
          <p>{book.inStock ? "In Stock" : "Out of Stock"}</p>
        </div>
  )
}

export default BookCard