import React from 'react'

function SaveButton(props) {
  return (
    <button
      className='saveButton'
      onClick={props.handleSaveSchema}
      type="button"
    >
      Save
    </button>
  )
}

export default SaveButton
