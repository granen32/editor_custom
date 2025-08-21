interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-18 w-full">
      <ul className="relative flex items-center">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`h-1 flex-1 ${
              index === currentStep ? "bg-primary" : "bg-gray-light"
            } ${index < steps.length - 1 ? "mr-2" : ""}`}
          >
            <label className="flex w-full cursor-auto justify-center pt-3 text-base leading-6">
              {step}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
