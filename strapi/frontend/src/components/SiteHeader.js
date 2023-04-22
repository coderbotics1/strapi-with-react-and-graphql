import React from 'react'
import { Link } from "react-router-dom"
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
	query GetCategories {
		categories{
			data {
				id
					attributes {
						name
				}
			}
		}
	}
`

export default function SiteHeader() {

  const { loading, error, data } = useQuery(CATEGORIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

    // console.log(data.categories.data)

  return (
    <div className='site-header'>
        <Link to="/">
            <h1>Blog Reviews</h1>
            <nav className='categories'>
              <span>Filter reviews by Categories</span>
              {
                data.categories.data.map((cat, i) => {
                  return (
                    <Link key={i} to={`/category/${cat.id}`}>
                      {cat.attributes.name}
                    </Link>
                  )
                })
              }
            </nav>
        </Link>
        
    </div>
  )
}
