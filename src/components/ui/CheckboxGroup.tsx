import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface CheckboxGroupProps {
  title?: string;
  options: CheckboxOption[];
  className?: string;
}

export const CheckboxGroup = ({ title, options, className }: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-base font-body font-medium text-charcoal mb-4">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-start space-x-3">
            <Checkbox
              id={option.id}
              checked={option.checked}
              onCheckedChange={option.onChange}
              className="mt-0.5"
            />
            <label
              htmlFor={option.id}
              className="text-sm font-body text-charcoal leading-5 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};