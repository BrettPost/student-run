import React from 'react'

const classroom = async ({params}: {
    params: Promise<{ teacherId: string }>
}) => {
    const teacherId = (await params).teacherId;
  return (
    <div>classroom {teacherId}</div>
  )
}

export default classroom