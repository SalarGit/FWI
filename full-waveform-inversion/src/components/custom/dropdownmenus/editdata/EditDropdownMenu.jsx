import Menu from "../regular/Menu.jsx";
import SelectBox from "../regular/SelectBox.jsx";
import EditModelData from "../../../header/sections/newrun/EditModelData.jsx";

export default function EditDropdownMenu({ isModelSelectorOpen, isEditOpen, handleAreOpen, handleModel, selectedModel, items, filter=undefined, modelType=undefined, width='' }) {
    function handleSelectItem(item) {
        handleModel(modelType, item, "SELECT")
        handleAreOpen(modelType, "SELECT");
    }

    return (
        <div className={`relative ${width}`}>
            <SelectBox isOpen={isModelSelectorOpen} onOpenClose={() => handleAreOpen(modelType, "SELECT")} selectedItem={filter(selectedModel.name)}/>

            {isModelSelectorOpen && <Menu items={items} onSelect={handleSelectItem} filter={modelType ? filter : undefined} />}
            
            {modelType && <EditModelData isEditOpen={isEditOpen} handleAreOpen={handleAreOpen} handleModel={handleModel} selectedModel={selectedModel} modelType={modelType} />}
        </div>
    )
}