import chiValues from "../../assets/chi-values.png";
import velocity from "../../assets/velocity.png";

export default function EmptyGraphs() {
    return (
        // Graphs Container
        <div className="flex justify-evenly pt-[54px]">

            {/* Chi values */}
            <img src={chiValues} alt="chi-values.png" 
                className="w-[536px] h-[353px]"
            />

            {/* Velocity */}
            <img src={velocity} alt="velocity.png" 
                className="w-[186px] h-[337px]"
            />
        </div>
    )
}