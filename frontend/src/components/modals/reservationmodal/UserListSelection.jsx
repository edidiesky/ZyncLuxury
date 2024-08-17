import React, { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/auth/authReducer";
export default function UserListSelection({ handleUserSelection }) {
  const dispatch = useDispatch()
  const { users } = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(GetAllUsers())
  }, [])
  const newUser = [
    {
      name: "Null Guest",
    },
    ...users
  ]
  //  console.log(newUser)
  return (
    <Select onValueChange={(e) => handleUserSelection(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {
          newUser?.map((user, index) => {
            return <SelectGroup>
              < SelectItem key={index} value={user}>{user?.username}
              </SelectItem>

            </SelectGroup>
          })
        }

      </SelectContent>
    </Select>
  )
}
