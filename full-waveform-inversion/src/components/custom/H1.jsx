export default function H1({ heading, styling=""}) {
    return (
        <p className={`text-lg font-bold ${styling}`}>{heading}</p>
    )
}