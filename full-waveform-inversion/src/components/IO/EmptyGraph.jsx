import chiValuesOriginal from "../../assets/chi-values-original.png";
import chiValuesReconstructed from "../../assets/chi-values-reconstructed.png";
import velocity from "../../assets/velocity.png";

export default function EmptyGraph({ version }) {
    return (
        // Graphs Container
        <div className="flex justify-evenly pt-[54px]">
            {/* Chi values */}
            <img src={`src/assets/chi-values-${version}.png`} alt={`chi-values-${version}.png`} 
                className="w-[536px] h-[353px]"
            />

            {/* Velocity */}
            <img src={velocity} alt="velocity.png" 
                className="w-[186px] h-[337px]"
            />
        </div>
    )
}