import React from 'react'

function OptionButtons(props) {
  return (
    <div>
      <button
        className="submit"
        onClick={() => props.handleCreateSchema(props.schema)}
        type="button"
      >
        Create Schema
            </button>
      <button
        className='createrow'
        onClick={props.createRow}
        type="button"
      >
        Add a New Key
            </button>
    </div>
  )
}

export default OptionButtons
