import React from 'react'
import "./negetiveButton.css"

interface NegativeButtonProp {
    label?: string;
    onClick?: () => void;
}

const NegativeButton: React.FC<NegativeButtonProp> = ({
    label,
    onClick
}) => {
  return (
    <button className='scl--negetive-button' onClick={onClick}>
      {label}
    </button>
  )
}

export default NegativeButton
