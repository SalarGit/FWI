import H1 from "./headings/H1.jsx";
import Border from "./Border.jsx";

export default function UpperPart({children, heading, styling="pl-8 py-[26px]"}) {
    return (
        <div>
            <div className={`flex items-center justify-between ${styling}`}>
                <H1 heading={heading}/>
                {/* <div className="text-black text-lg font-bold font-['General Sans Variable'] leading-loose">Original input</div> */}
                {children} {/* Sometimes there's no children. */}
            </div>
            <Border />
        </div>
    )
}