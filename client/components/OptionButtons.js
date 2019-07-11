import React from 'react'
import SaveButton from './SaveButton'

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
      <SaveButton result={props.result} handleSaveSchema={props.handleSaveSchema} />

    </div>
  )
}

export default OptionButtons
