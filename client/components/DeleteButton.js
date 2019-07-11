import React from 'react'

function DeleteButton(props) {
    return (
        <div>
            <button
                className="submit" id="deleteButton"
                // should delete from database => refresh schema storage
                onClick={() => props.handleDeleteSchema()}
                type="button"
            >
                Delete
  </button>
        </div>

    )
}

export default DeleteButton
