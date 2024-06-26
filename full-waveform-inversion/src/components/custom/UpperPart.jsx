import H1 from "./H1.jsx";
import Border from "./Border.jsx";

export default function UpperPart({heading, side, styling="py-6 pl-8"}) {
    return (
        <div>
            <H1 heading={heading} styling={styling}/>
            <Border side={side}/>
        </div>
    )
}