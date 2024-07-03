export default function H2({ heading, styling="" }) {
    return (
        <p className={`text-zinc-500 font-medium ${styling}`}>{ heading }</p>
    )
}