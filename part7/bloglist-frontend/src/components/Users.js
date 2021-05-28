import React, { useEffect, useState } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(async () => {
    const getAllUsers = await userService.getAll()
    setUsers(getAllUsers)
  }, [])
  //console.log(users)

  return (
    <Container>
      <Typography variant="h4">Users</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell># of Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell>
                <Typography>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Typography>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default Users
