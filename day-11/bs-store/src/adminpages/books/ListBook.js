import React from 'react'
import { useSelector } from 'react-redux'

export default function ListBook() {
  const {theme} = useSelector(state => state.setting)
  
  return (
    <div>Book List 
      <div>
      {theme}
      </div>
    </div>
  )
}
