import {IoIosClose} from "react-icons/io";
import {motion} from 'framer-motion';
import {notificationVariants} from "../../../animation/animation";

const Notification = () => {
    return (
        <motion.div
            className="w-fit h-fit absolute mt-7 right-0 bg-white dark:bg-[#19191C] border border-gray-200 rounded dark:border-gray-600"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={notificationVariants}>
            <div
                className="w-[334px] h-[54px] flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                <p className="text-[#212b37] dark:text-[#FFFFFFCC] font-medium text-[15px] font-sans">Notification</p>
                <span
                    className="w-fit h-full flex justify-center items-center text-center text-[11px] font-sans font-medium px-2 text-white bg-[#9E5CF7] rounded">5 Unread</span>
            </div>
            <ul className="max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <li className="w-full flex justify-between items-center dark:bg-[#19191C] px-4 py-2 border-b border-gray-200 dark:border-gray-600 dark:hover:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[50%]">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%283%29.png/1200px-Jisoo_of_Blackpink_at_a_Dior_event%2C_April_18%2C_2025_%283%29.png"
                                alt="jisoo"/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <a className="text-[14px] text-[#0A0A0A] dark:text-[#FFFFFF] font-medium font-sans">Product
                                Deleted</a>
                            <p className="text-[12px] text-[#6e829f] dark:text-[#FFFFFF80] font-normal font-sans">Admin
                                just admin
                                items.</p>
                            <span
                                className="text-[10px] text-[#6e829f] dark:text-[#FFFFFF80] font-normal font-sans">Now</span>
                        </div>
                    </div>
                    <div>
                        <IoIosClose/>
                    </div>
                </li>
            </ul>
            <div className="w-full h-full dark:bg-[#19191C] p-4">
                <button
                    className="w-full h-full text-white text-[13px] py-2 font-medium font-sans hover:bg-[#7277F8] bg-[#6067F7]  hover:cursor-pointer rounded">View
                    All
                </button>
            </div>
        </motion.div>
    )
}

export default Notification;