import React, {useState} from 'react';
import { EPistePositions } from "@/enums/EPistePositions";
import {useTouchStore} from "@/state/touchState";
import {TPistePosition} from "@/types/pistePosition";
import {useVideoStore} from "@/state/videoState";

export function PistePosition() {
    const [position, setPosition] = useState(EPistePositions.ZONE_1);

    const handlePositionClick = (position: EPistePositions) => {
        setPosition(position);
        let leftFencerPosition: TPistePosition;
        let rightFencerPosition: TPistePosition;
        switch (position) {
            case EPistePositions.LEFT_ZONE_2:
                leftFencerPosition = {position: EPistePositions.OWN_ZONE_2, fencerName: useVideoStore.getState().leftFencer.name};
                rightFencerPosition = {position: EPistePositions.OPPONENTS_ZONE_2, fencerName: useVideoStore.getState().rightFencer.name};
                break;
            case EPistePositions.LEFT_ZONE_3:
                leftFencerPosition = {position: EPistePositions.OWN_ZONE_3, fencerName: useVideoStore.getState().leftFencer.name};
                rightFencerPosition = {position: EPistePositions.OPPONENTS_ZONE_3, fencerName: useVideoStore.getState().rightFencer.name};
                break;
            case EPistePositions.RIGHT_ZONE_2:
                leftFencerPosition = {position: EPistePositions.OPPONENTS_ZONE_2, fencerName: useVideoStore.getState().leftFencer.name};
                rightFencerPosition = {position: EPistePositions.OWN_ZONE_2, fencerName: useVideoStore.getState().rightFencer.name};
                break;
            case EPistePositions.RIGHT_ZONE_3:
                leftFencerPosition = {position: EPistePositions.OPPONENTS_ZONE_3, fencerName: useVideoStore.getState().leftFencer.name};
                rightFencerPosition = {position: EPistePositions.OWN_ZONE_3, fencerName: useVideoStore.getState().rightFencer.name};
                break;
            default:
                leftFencerPosition = {position: EPistePositions.ZONE_1, fencerName: useVideoStore.getState().leftFencer.name};
                rightFencerPosition = {position: EPistePositions.ZONE_1, fencerName: useVideoStore.getState().rightFencer.name};
                break;
        }
        const positions: TPistePosition[] = [leftFencerPosition, rightFencerPosition];
        useTouchStore.getState().setPositions(positions)
    };

    return (
        <div className="text-center flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold mb-2">Piste Position: {position}</h1>
            <div className="flex w-[800px] h-24 border-gray-500 border-4 border-solid bg-gray-300 rounded-sm">
                <div onClick={() => handlePositionClick(EPistePositions.LEFT_ZONE_3)} className="tooltip tooltip-bottom flex cursor-crosshair h-full w-[25%] hover:border-2 hover:border-accent hover:border-dashed" data-tip={EPistePositions.LEFT_ZONE_3}>
                    <div className="flex w-[35%] bg-gray-50"></div>
                    <div className="flex w-[65%] bg-red-300"></div>
                </div>
                <div onClick={() => handlePositionClick(EPistePositions.LEFT_ZONE_2)} className="tooltip tooltip-bottom cursor-crosshair h-full w-[21%] hover:border-2 hover:border-accent hover:border-dashed" data-tip={EPistePositions.LEFT_ZONE_2}></div>
                <div onClick={() => handlePositionClick(EPistePositions.ZONE_1)} className="tooltip tooltip-bottom cursor-crosshair h-full w-[28.5%] border-white border-l-2 border-r-2 border-solid bg-gray-200 hover:border-2 hover:border-accent hover:border-dashed" data-tip={EPistePositions.ZONE_1}></div>
                <div onClick={() => handlePositionClick(EPistePositions.RIGHT_ZONE_2)} className="tooltip tooltip-bottom cursor-crosshair h-full w-[21%] hover:border-2 hover:border-accent hover:border-dashed" data-tip={EPistePositions.RIGHT_ZONE_2}></div>
                <div onClick={() => handlePositionClick(EPistePositions.RIGHT_ZONE_3)} className="tooltip tooltip-bottom cursor-crosshair h-full w-[25%] flex hover:border-2 hover:border-accent hover:border-dashed" data-tip={EPistePositions.RIGHT_ZONE_3}>
                    <div className="flex w-[65%] bg-red-300"></div>
                    <div className="flex w-[35%] bg-gray-50"></div>
                </div>
            </div>
        </div>

    );
}
