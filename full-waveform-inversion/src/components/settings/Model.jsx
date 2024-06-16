import info from '../../assets/info.svg';
import Title from '../custom/Title.jsx';

export default function Model({ model, modelType }) {
    const title = model + ' model:';

    return (
        <div className="flex flex-col space-y-[34px]">
            <div className="flex space-x-3">
                <Title title={title}/>
                <img src={info} alt="info.svg" />
            </div>
            <p className="text-lg font-medium">{modelType}</p>
        </div>
    )
}