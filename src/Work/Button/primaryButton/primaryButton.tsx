import React from 'react'
import './primaryButton.css'

interface PrimaryButtonProp {
    label?: string;
    onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProp> = ({
    label,
    onClick
}) => {
  return (
    <button className='scl--primary-button-container' onClick={onClick}>
      {label}
    </button>
  )
}

export default PrimaryButton
