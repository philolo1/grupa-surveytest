import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styled from 'styled-components';
import { Modal } from '../signup/styles';

const Emoji = styled.div`
  color: black;
  cursor: pointer;
  font-size: 24px;
`

export default ({selected = '😃' , onChange}) => {
  const [open, setOpen] = useState(false)

  const handleEmojiClicked = (e, emojiObject) => {
    setOpen(false)
    onChange(emojiObject.emoji)
  }

  return (
    <div className='field'>
      <div onClick={() => setOpen(!open)}>
        <Emoji>{selected}</Emoji>
      </div>
      {open ? <Modal><EmojiPicker onEmojiClick={handleEmojiClicked} /></Modal> : null}
    </div>
  )
}
