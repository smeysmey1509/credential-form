import FormSelection from "./FormSelection/FormSelection";
import {useState} from "react";
import ThemeSelection from "./ThemeSelection/ThemeSelection";

const Work: React.FC = () => {
    const [status, setStatus] = useState<string>("")
    return (
        <div>
            <ThemeSelection/>
        </div>
    )
}

export default Work