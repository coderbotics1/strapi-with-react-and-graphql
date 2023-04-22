import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';

const REVIEWS = gql`
	query GetReviews {
		reviews {
			data {
				id
					attributes {
						title,
						rating,
						body,
						categories {
							data {
								id
									attributes {
										name,
									}
							}
						}
				}
			}
		}
	}
`


export default function Homepage() {
//   const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')
//   const allData = data || []

	const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

//   console.log(data.reviews.data)
	if (data.reviews.data) {
  return (
    <div>
      {data.reviews.data.map((review, index) => {
		//   console.log("dataaa ",review)
		  return (
			<div key={index} className="review-card">
			<div className="rating">{review.attributes.rating}</div>
			<h2>{review.attributes.title}</h2>
			
			{
				review.attributes.categories.data.map((cat, index) => {
					console.log("CATATAT", cat)
					return (
						<small key={index}>{cat.attributes.name}</small>
					)
				})
			}
  
			<p>{review.attributes.body.substring(0, 200)}...</p>
			<Link to={`/details/${review.id}`}>Read more</Link>
		  </div>
		  )
	  })}
    </div>
  )
	}
}