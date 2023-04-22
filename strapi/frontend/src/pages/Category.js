import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const CATEGORY = gql`
	query GetCategory($id: ID!) {
		category(id: $id) {
			data {
				id
				attributes {
					name,
					reviews {
						data {
							id
								attributes {
									title,
									body,
									rating,
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
			}
		}
	}
`
export default function Category() {

	const { id } = useParams()
	const { loading, error, data } = useQuery(CATEGORY, {
		variables: { id: id}
	})

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

    // console.log("DETAILS ",data.category.data.attributes.reviews.data)
  return (
    <div>
		<h2>{data.category.data.attributes.name}</h2>
		{data.category.data.attributes.reviews.data.map((reviews, index) => {
			console.log("category -> ",reviews.attributes.categories.data)
			return (
				<div className='review-card' key={reviews.id}>
					<div className="rating">{reviews.attributes.rating}</div>
					<h2>{reviews.attributes.title}</h2>

					{
						reviews.attributes.categories.data.map((cat, index) => {
							console.log("CATATAT", cat)
							return (
								<small key={index}>{cat.attributes.name}</small>
							)
						})
					}
					

					<p>{reviews.attributes.body.substring(0, 200)}...</p>
					<Link to={`/details/${reviews.id}`}>Read more</Link>
				</div>	

			)

		})

		}
	</div>
  )
}
