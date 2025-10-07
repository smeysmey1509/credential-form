import React from "react";

interface PublishDateInputProps {
    label?: string;
}

const PublishDateInput = ({ label }: PublishDateInputProps) => {
    return (
        <div className="w-full flex flex-col">
            <label
                htmlFor="publish-date"
                className="text-[14px] font-medium text-[#212b37] mb-2"
            >
                {label || "Publish Date"}
            </label>
            <input
                type="date"
                id="publish-date"
                name="publish-date"
                className="border rounded bg-white px-3 py-2 text-[13px] text-[#212b37] border-[#dee7f1] focus:border-[#5c67f7] focus:bg-[#fff] focus:shadow-[0px_0px_6px_0px_rgba(92,_103,_247,_0.5)] outline-none cursor-pointer"
            />
        </div>
    );
};

export default PublishDateInput;
