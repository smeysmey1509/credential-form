import React from "react";

interface IProps {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PublishDateTimeInput: React.FC<IProps> = ({label, value, onChange}) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Publish Time */}
            <div className="flex flex-col">
                <label
                    htmlFor="publish-time"
                    className="text-[14px] font-medium text-[#212b37] dark:text-white mb-2"
                >
                    {label}
                </label>
                <input
                    type="time"
                    id="publish-time"
                    name="publish-time"
                    value={value}
                    className="border rounded bg-white dark:bg-[#111827] px-3 py-2 text-[13px] text-[#212b37] dark:text-white border-[#dee7f1] dark:border-[#374151] focus:border-[#5c67f7] focus:bg-[#fff] dark:focus:bg-[#111827] focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] outline-none cursor-pointer"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default PublishDateTimeInput;
