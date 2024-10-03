import H1 from "./headings/H1.jsx";
import BorderTop from "./borders/BorderTop.jsx";

export default function UpperPart({children, heading, styling="pl-8 py-[26px]"}) {
    return (
        <>
            <div className={`flex items-center justify-between ${styling}`}>
                <H1 heading={heading}/>
                {children} {/* There's not always children. */}
            </div>

            <BorderTop />
        </>
    )
}