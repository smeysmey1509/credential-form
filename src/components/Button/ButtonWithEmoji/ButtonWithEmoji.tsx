import React from "react";

interface ButtonWithEmojiProp {
  btnClass?: string;
  onClick?: () => void;
  emoji?: React.ReactNode;
  label?: string;
}

const ButtonWithEmoji: React.FC<ButtonWithEmojiProp> = ({
  btnClass,
  onClick,
  emoji,
  label
}) => {
  return (
    <button
      className={`w-fit h-fit min-w-[130px] flex justify-center items-center bg-[#5C67F7] hover:bg-[#6E77F8] text-[13px] cursor-pointer font-sans font-semibold text-white py-[6px] px-[12px] gap-2 rounded ${btnClass}`}
      onClick={onClick}
    >
      {emoji}
      {label}
    </button>
  );
};

export default ButtonWithEmoji;
