interface ProgressFlowProps {
  currentStep: number;
}

interface Step {
  label: string;
  number: number;
}

const steps: Step[] = [
  { label: "Login", number: 1 },
  { label: "Select Role", number: 2 },
  { label: "Done", number: 3 },
];

export function ProgressFlow({ currentStep }: ProgressFlowProps) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            {/* Step Circle */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step.number === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.number < currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-pc-text-secondary border border-border"
                }
              `}
            >
              {step.number < currentStep ? "✓" : step.number}
            </div>
            
            {/* Step Label */}
            <span
              className={`
                ml-2 text-sm font-medium hidden sm:block
                ${
                  step.number === currentStep
                    ? "text-pc-text-primary"
                    : "text-pc-text-secondary"
                }
              `}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`
                w-8 md:w-16 h-0.5 mx-2
                ${
                  step.number < currentStep
                    ? "bg-primary"
                    : "bg-border"
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}