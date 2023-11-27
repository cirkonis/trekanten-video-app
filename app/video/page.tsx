'use client'

import React, {useState} from "react";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {useVideoStore} from "@/state/videoState";
import {useTouchStore} from "@/state/touchState";
import {FencingTouch} from "@/types/fencingTouch";
import {FencerNameInputs} from "@/components/FencerNameInputs";
import {TouchSequenceBuilder} from "@/components/TouchSequenceBuilder";
import {TouchAwarded} from "@/components/TouchAwarded";
import {PistePosition} from "@/components/PistePosition";
import {TheVideoComponent} from "@/components/TheVideoComponent";

export default function Video() {

    const handleJumpToTimestamp = (timestamp: number) => {
        // @ts-ignore
        if (playerRef.current && playerRef.current.seekTo) {
            // @ts-ignore
            playerRef.current.seekTo(timestamp);
        }
    };

    function handleAddTouch() {
        useVideoStore.getState().addTouch(useTouchStore.getState());
    }

    function getTouchDescription(touch: FencingTouch): string {
        const touchType = touch.type;

        if (touchType === ETouchTypes.SINGLE_TOUCH_LEFT || touchType === ETouchTypes.SINGLE_TOUCH_RIGHT) {
            return `by ${touch.pointAwardedTo[0].name} at ${touch.position}`;
        } else {
            return touchType === ETouchTypes.DOUBLE_TOUCH ? 'Double Touch' : 'No Touch';
        }
    }

    return (
        <div>
            <FencerNameInputs/>
            <TheVideoComponent/>
            <TouchSequenceBuilder/>
            <TouchAwarded/>
            <PistePosition/>
        </div>
    );
}
