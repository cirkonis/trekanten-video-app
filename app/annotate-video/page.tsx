'use client'

import React, {useEffect, useState} from "react";
import { FencersStep } from "@/components/video-annotator/steps/FencersStep";
import {useStepStore} from "@/state/annotationStepsState";
import {VideoStep} from "@/components/video-annotator/steps/VideoStep";
import {AnnotateTouchesStep} from "@/components/video-annotator/steps/AnnotateTouchesStep";
import {SubmitStep} from "@/components/video-annotator/steps/SubmitStep";
import {useVideoStore} from "@/state/videoState";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Video() {

    const currentStep = useStepStore((state) => state.currentStep);
    const setCurrentStep = useStepStore((state) => state.setCurrentStep);
    const selectedYouTubeVideoId = useVideoStore.getState().youtubeVideoId;

    const [hasVideoID, setHasVideoID] = useState(true);

    useEffect(() => {
        if (!selectedYouTubeVideoId) {
            setHasVideoID(false);
        }
    }, [selectedYouTubeVideoId]);

    const steps = [
        { label: "Confirm Video", components: [<VideoStep />] },
        { label: "Select Fencers", components: [<FencersStep />] },
        {
            label: "Annotate Touches",
            components: [
                        <AnnotateTouchesStep />,
            ],
        },
        { label: "Submit", components: [<SubmitStep />] },
    ];

    if (!hasVideoID) {
        return (
            <div>
                <h1 className="text-3xl px-8 mt-4">Video Annotator</h1>
                <p className="px-8 mt-4">No video selected.</p>
                <Link className="btn btn-accent" href="/unprocessed-videos">
                  Go to Unprocessed Videos
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl px-8 mt-4">Video Annotator</h1>
            <ul className="steps w-full my-6">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className={`step ${index <= currentStep ? "step-primary" : ""}`}
                        onClick={() => setCurrentStep(index)}
                    >
                        {step.label}
                    </li>
                ))}
            </ul>
            <div className="divider mb-6"></div>
            {steps.map(
                (step, index) =>
                    index === currentStep &&
                    step.components.map((component, componentIndex) => (
                        <div key={componentIndex}>{component}</div>
                    ))
            )}
        </div>
);
}
