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
import { getAllRooms } from "@/features/room/roomReducer";
export default function RoomModalSelection({handleRoomId}) {
  const dispatch = useDispatch()
  const { rooms } = useSelector((store) => store.room)
 
  // useEffect(() => {
  //   dispatch(getAllRooms())
  // }, [])
  return (
    <Select onValueChange={(e) => handleRoomId(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Room" />
      </SelectTrigger>
      <SelectContent>
        {
          rooms?.map((room, index) => {
            return <SelectGroup>
              < SelectItem key={index} value={room}>{room?.title}
              </SelectItem>

            </SelectGroup>
          })
        }

      </SelectContent>
    </Select>
  )
}
