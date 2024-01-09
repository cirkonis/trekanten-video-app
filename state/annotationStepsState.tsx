import { create } from 'zustand';

export type StepStore = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
};

export const useStepStore = create<StepStore>((set) => ({
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
}));