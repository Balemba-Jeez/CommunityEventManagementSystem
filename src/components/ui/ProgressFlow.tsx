interface Step {
  id: string;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface ProgressFlowProps {
  steps: Step[];
}

export const ProgressFlow = ({ steps }: ProgressFlowProps) => {
  return (
    <div className="bg-pure-white border-b border-border px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      step.isActive || step.isCompleted
                        ? "bg-royal-blue text-pure-white"
                        : "bg-neutral-bg text-secondary-gray"
                    }
                  `}
                >
                  {index + 1}
                </div>
                <span
                  className={`
                    mt-2 text-sm font-body
                    ${
                      step.isActive || step.isCompleted
                        ? "text-royal-blue font-medium"
                        : "text-secondary-gray"
                    }
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-16 h-0.5 mx-4 mb-6
                    ${
                      steps[index + 1].isCompleted
                        ? "bg-royal-blue"
                        : "bg-border"
                    }
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};