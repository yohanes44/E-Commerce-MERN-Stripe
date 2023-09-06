import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/announcements/Announcement'

export default function Home() {
  return (
    <div>
        <Announcement />
      <Navbar />
    </div>
  )
}
