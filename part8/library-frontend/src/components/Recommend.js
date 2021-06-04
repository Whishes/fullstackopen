import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from "../queries"

const Recommend = ({show}) => {
    //const result = useQuery(ALL_BOOKS)
    const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "no-cache"
    })
    const user = useQuery(USER)
    const [me, setMe] = useState(null)
    const [favouriteGenre, setFavouriteGenre] = useState([])

    useEffect(() => {
        if (user.data) {
            setMe(user.data.user)
            getBooks({variables: {genre: user.data.user.favouriteGenre}})
        }
    }, [user.data, user, getBooks])

    useEffect(() => {
        if (result.data) {
            setFavouriteGenre(result.data.allBooks)
        }
    }, [setFavouriteGenre, result])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>recommendatons</h2>
            <p>books in your favourite genre "{me.favouriteGenre}"</p>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {favouriteGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
    )
}

export default Recommend
