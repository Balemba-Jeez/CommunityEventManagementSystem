import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const TermsCheckbox = ({ id, checked, onChange, error }: TermsCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          className="mt-0.5"
        />
        <label
          htmlFor={id}
          className="text-sm font-body text-charcoal leading-5 cursor-pointer"
        >
          I agree to the{" "}
          <a
            href="/terms"
            className="text-primary hover:underline font-medium"
          >
            PC Community | Events Terms
          </a>
          . Learn about how we use and protect your data in our{" "}
          <a
            href="/privacy"
            className="text-primary hover:underline font-medium"
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {error && (
        <p className="text-sm text-destructive font-body ml-6">{error}</p>
      )}
    </div>
  );
};