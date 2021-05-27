import React, { useEffect, useState } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(async () => {
    const getAllUsers = await userService.getAll()
    setUsers(getAllUsers)
  }, [])
  //console.log(users)

  return (
    <div>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
