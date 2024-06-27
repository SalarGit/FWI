import H1 from "./H1.jsx";
import Border from "./Border.jsx";

export default function UpperPart({children, heading, styling="pl-8 py-6"}) {
    return (
        <div>
            <div className={`flex items-center justify-between ${styling}`}>
                <H1 heading={heading}/>
                {children} {/* Sometimes there's no children. */}
            </div>
            <Border />
        </div>
    )
}