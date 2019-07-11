import React from 'react';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

function OptionButtons(props) {
  return (
    <div id="optionButtons">
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
      <DeleteButton handleDeleteSchema={props.handleDeleteSchema} />
    </div>
  )
}

export default OptionButtons
