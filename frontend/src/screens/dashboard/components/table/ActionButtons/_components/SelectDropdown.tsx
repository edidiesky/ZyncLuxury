import { ActionButton, SelectedAction } from '@/types';
import { getDropdownOptions } from '../_constants';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SelectDropdownProps {
  button: ActionButton;
  label: string;
  type: string;
  selectedAction: SelectedAction;
  setSelectedAction: (value: SelectedAction) => void;
}

export default function SelectDropdown({
  button,
  label,
  type,
  selectedAction,
  setSelectedAction,
}: SelectDropdownProps) {
  const updateSelectedAction = (buttonValue: string, value: string) => {
    setSelectedAction({
      ...selectedAction,
      [buttonValue]: value,
    });
  };

  const getDisplayLabel = (buttonValue: string, selectedValue: string) => {
    const options = getDropdownOptions(buttonValue, type, selectedAction);
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    return selectedOption?.label || 'Select an option';
  };

  const options = getDropdownOptions(button.value, type, selectedAction);

  return (
    <div className={'text-gray-500 flex items-center gap-1 mr-3'}>
      <p className="text-sm">{label}:</p>
      <Select
        value={selectedAction[button.value] || ''}
        onValueChange={(value) => updateSelectedAction(button.value, value)}
      >
        <SelectTrigger
          className={`w-40 h-10 px-2 text-sm rounded-md truncate cursor-pointer bg-white border shadow-custom-light text-gray-900 ${
            type === 'reports' ? 'border-[#CDD0D5]' : 'ml-1 w-[180px]'
          }`}
        >
          <span className="truncate">
            {getDisplayLabel(button.value, selectedAction[button.value] || '')}
          </span>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 rounded-md shadow-sm z-50">
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="" disabled>
              No options available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
