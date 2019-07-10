import React from 'react'

function SaveButton(props) {
  return (
    <div className='Buttons'>
      <button
        className='saveButton'
        onClick={props.handleSaveSchema}
        type="button"
      >
        Save
        </button>
    </div>
  )
}

export default SaveButton
