import React from 'react'


import "./newsLetter.scss"
import { Send } from '@mui/icons-material'

export default function NewsLetter() {
  return (
    <div className='newsLetterContainer'>
        <h1 className="title">Newsletter</h1>
        <div className="desc">Get update from your favorite products</div>
        <div className="inputContainer">
            <input type="text" placeholder='your email' />
            <button>
                <Send />
            </button>
        </div>
    </div>
  )
}
