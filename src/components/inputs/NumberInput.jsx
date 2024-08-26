import React from 'react'
import './NumberInput.css'

const NumberInput = ({
    onInput,
    placeholder
}) => {
    return (
        <div className="demo-input" onInput={onInput}>
            <textarea placeholder={placeholder} className="demo-input-field" />
        </div>
    )
}

export default NumberInput
