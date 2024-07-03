import { useState } from "react";

export default function Test() {
    const [outer, setOuter] = useState('outer no');
    const [inner, setInner] = useState('inner no');

    function handleOuter() {
        setOuter((prev) => prev === 'outer no' ? 'outer yes' : 'outer no');
    }
    function handleInner() {
        setInner((prev) => prev === 'inner no' ? 'inner yes' : 'inner no');
    }

    return (
        // Outer
        <div className="relative">
            <button onClick={handleOuter} className="border hover:bg-blue-600 w-full">
                {outer}
                {/* Inner */}
            </button>
            <button onClick={handleInner} className="border absolute right-4 bg-white">
                {inner}
            </button>
        </div>
    )
}