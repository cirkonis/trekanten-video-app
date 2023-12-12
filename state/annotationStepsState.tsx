import { create } from 'zustand';

export type StepStore = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
};

export const useStepStore = create<StepStore>((set) => ({
    currentStep: 1,
    setCurrentStep: (step) => set({ currentStep: step }),
}));