import chiValuesOriginal from "../../assets/chi-values-original.png";
import chiValuesReconstructed from "../../assets/chi-values-reconstructed.png";
import chiValuesCompare from "../../assets/chi-values-compare.png";

import velocity from "../../assets/velocity.png";
import velocityCompare from "../../assets/velocity-compare.png";
import defaultIO from "../../assets/default-io.png";

export default function EmptyGraph({ version, padding='pt-[54px]' }) {
    return (
        // Graphs Container
        <div className={`flex justify-evenly ${version === 'compare' ? 'p-6' : 'pt-[54px]'}`}>
            {/* Chi values */}
            {/* {version === 'compare' ?
                <>
                    <img src={chiValuesCompare} alt={`chi-values-compare.png`} 
                        className=""
                    />
                    <img src={velocityCompare} alt="velocity-compare.png" 
                        className=""
                    />
                </>
                :
                <>
                    <img src={`src/assets/chi-values-${version}.png`} alt={`chi-values-${version}.png`} 
                        className="w-[536px] h-[353px]"
                    />
                    <img src={velocity} alt="velocity.png" 
                        className="w-[186px] h-[337px]"
                    />
                </>
            } */}
            <img src={defaultIO} alt='defaultIO.png'
                className="w-[536px] h-[353px]"
            />
            <img src={velocity} alt="velocity.png" 
                className="w-[186px] h-[337px]"
            />

            {/* <img src={`src/assets/chi-values-${version}.png`} alt={`chi-values-${version}.png`} 
                className="w-[536px] h-[353px]"
            />

            <img src={velocity} alt="velocity.png" 
                className="w-[186px] h-[337px]"
            /> */}
        </div>
    )
}