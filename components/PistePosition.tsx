import React from 'react';
import {EPistePositions} from "@/enums/EPistePositions";

export function PistePosition() {
    return (
        <div className="text-center flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-8">Piste Position</h1>
            <div className="flex w-[800px] h-24 border-gray-500 border-4 border-solid bg-gray-300 rounded-sm">
                <div data-tip={EPistePositions.BACK_LINE_LEFT} className="tooltip cursor-pointer h-full w-1/12"></div>
                <div data-tip={EPistePositions.WARNING_ZONE_LEFT} className="tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300"></div>
                <div data-tip={EPistePositions.NEAR_WARNING_LINE_LEFT} className="tooltip cursor-pointer h-full w-2/12"></div>
                <div data-tip={EPistePositions.BEHIND_GUARD_LINE_LEFT} className="tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-l-2"></div>
                <div data-tip={EPistePositions.LEFT_OF_CENTER_LINE} className="tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4"></div>
                <div data-tip={EPistePositions.CENTER_LINE} className="tooltip cursor-pointer h-full w-[12px] border-black border-1 border-solid bg-gray-100"></div>
                <div data-tip={EPistePositions.RIGHT_OF_CENTER_LINE} className="tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4"></div>
                <div data-tip={EPistePositions.BEHIND_GUARD_LINE_RIGHT} className="tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-r-2"></div>
                <div data-tip={EPistePositions.NEAR_WARNING_LINE_RIGHT} className="tooltip cursor-pointer h-full w-2/12"></div>
                <div data-tip={EPistePositions.WARNING_ZONE_RIGHT} className="tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300"></div>
                <div data-tip={EPistePositions.BACK_LINE_RIGHT} className="tooltip cursor-pointer h-full w-1/12"></div>
            </div>
        </div>
    );
}
