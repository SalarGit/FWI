import velocity from "../../assets/velocity.png";
import defaultIO from "../../assets/default-io.png";

export default function EmptyGraph() {
    return (
        <div className={`flex justify-evenly pt-[54px]`}>
            <img src={defaultIO} alt='defaultIO.png'
                className="w-[536px] h-[353px]"
            />
            <img src={velocity} alt="velocity.png" 
                className="w-[186px] h-[337px]"
            />
        </div>
    )
}