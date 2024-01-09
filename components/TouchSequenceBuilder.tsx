import React from 'react';
import { ETouchSequenceElements } from "@/enums/ETouchSequenceElements";
import {useTouchStore} from "@/state/touchState";

export function TouchSequenceBuilder() {
    const selectedElements = useTouchStore((state) => state.sequence);
    const setSequence = useTouchStore((state) => state.setSequence);

    const touchSequenceElements = Object.values(ETouchSequenceElements);

    const handleElementClick = (element: ETouchSequenceElements) => {
        const newSequence = [...selectedElements, element];
        setSequence(newSequence);
    };

    const handleRemoveElement = (index: number) => {
        const newSequence = [...selectedElements];
        newSequence.splice(index, 1);
        setSequence(newSequence);
    };

    const handleClearSequence = () => {
        setSequence([]);
    };

    return (
        <div className="my-4 p-4">
            <div className="flex flex-row mb-2 h-9 items-center">
                Touch sequence:
                {selectedElements.map((element: ETouchSequenceElements, index: number) => (
                    <div className="badge badge-accent mx-2 " key={index}>
                        {element}
                        <button className="ml-2" onClick={() => handleRemoveElement(index)}>X</button>
                    </div>
                ))}
            </div>
            <div>
                {touchSequenceElements.map((element) => (
                    <button className="btn btn-info btn-sm m-2" key={element} onClick={() => handleElementClick(element)}>
                        {element}
                    </button>
                ))}
                <button className="btn btn-sm btn-warning" onClick={handleClearSequence}>
                    Clear Sequence
                </button>
            </div>

        </div>
    );
}
