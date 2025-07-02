import './GrayButton.css'
import React from "react";

interface GrayButtonProps {
    label: string;
    onClick?: () => void;
}

const GrayButton: React.FC<GrayButtonProps> = ({label, onClick}) => {
    return (
        <button className="scl--gray-button" onClick={onClick}>{label}</button>
    )
}

export default GrayButton;