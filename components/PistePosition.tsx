import React from 'react';
import { EPistePositions } from "@/enums/EPistePositions";
import {useTouchStore} from "@/state/touchState";

export function PistePosition() {
    const position = useTouchStore((state) => state.position);

    const handlePositionClick = (position: EPistePositions) => {
        useTouchStore.getState().setPosition(position);
    };

    return (
        <div className="text-center flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold mb-2">Piste Position: {position}</h1>
            <div className="flex w-[800px] h-24 border-gray-500 border-4 border-solid bg-gray-300 rounded-sm">
                <div onClick={() => handlePositionClick(EPistePositions.BACK_LINE_LEFT)} className="tooltip cursor-pointer h-full w-1/12" data-tip={EPistePositions.BACK_LINE_LEFT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.WARNING_ZONE_LEFT)} className="tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300" data-tip={EPistePositions.WARNING_ZONE_LEFT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.NEAR_WARNING_LINE_LEFT)} className="tooltip cursor-pointer h-full w-2/12" data-tip={EPistePositions.NEAR_WARNING_LINE_LEFT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.BEHIND_GUARD_LINE_LEFT)} className="tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-l-2" data-tip={EPistePositions.BEHIND_GUARD_LINE_LEFT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.LEFT_OF_CENTER_LINE)} className="tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4" data-tip={EPistePositions.LEFT_OF_CENTER_LINE}></div>
                <div onClick={() => handlePositionClick(EPistePositions.CENTER_LINE)} className="tooltip cursor-pointer h-full w-[12px] border-black border-1 border-solid bg-gray-100" data-tip={EPistePositions.CENTER_LINE}></div>
                <div onClick={() => handlePositionClick(EPistePositions.RIGHT_OF_CENTER_LINE)} className="tooltip cursor-pointer h-full w-4/12 border-solid border-white border-l-4 border-r-4" data-tip={EPistePositions.RIGHT_OF_CENTER_LINE}></div>
                <div onClick={() => handlePositionClick(EPistePositions.BEHIND_GUARD_LINE_RIGHT)} className="tooltip cursor-pointer h-full w-2/12 border-solid border-gray border-r-2" data-tip={EPistePositions.BEHIND_GUARD_LINE_RIGHT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.NEAR_WARNING_LINE_RIGHT)} className="tooltip cursor-pointer h-full w-2/12" data-tip={EPistePositions.NEAR_WARNING_LINE_RIGHT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.WARNING_ZONE_RIGHT)} className="tooltip cursor-pointer h-full w-3/12 border-solid border-red-500 border-l-2 border-r-2 bg-red-300" data-tip={EPistePositions.WARNING_ZONE_RIGHT}></div>
                <div onClick={() => handlePositionClick(EPistePositions.BACK_LINE_RIGHT)} className="tooltip cursor-pointer h-full w-1/12" data-tip={EPistePositions.BACK_LINE_RIGHT}></div>
            </div>
        </div>

    );
}
