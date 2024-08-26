import React from 'react'
import './GithubButton.css'

const MainButton = ({
    onClick,
    buttonText
}) => {
    return (
        <button class="button" onClick={onClick}>
            <p class="text">
                {buttonText}
            </p>
        </button>
    )
}

export default MainButton
