import FormSelection from "./FormSelection/FormSelection";
import {useState} from "react";

const Work: React.FC = () => {
    const [status, setStatus] = useState<string>("")
    return (
        <div>
            <FormSelection
                label="Select Country"
                options={["Published", "Unpublished"]}
                value={status}
                onChange={(val) => setStatus(val)}
            />
        </div>
    )
}

export default Work