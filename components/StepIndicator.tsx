import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepNames }) => {
  return (
    <div className="flex items-start">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center w-1/${totalSteps}">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
                  ${isActive ? 'bg-blue-600 text-white ring-2 ring-blue-300' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isCompleted ? '✓' : step}
              </div>
              <p className={`mt-2 text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>{stepNames[step - 1]}</p>
            </div>
            {step < totalSteps && <div className={`flex-1 h-1 mt-3.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
