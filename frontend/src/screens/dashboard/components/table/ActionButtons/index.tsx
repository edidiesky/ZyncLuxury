import { useMemo } from 'react';
import SelectDropdown from './_components/SelectDropdown';
import { UpdatedActionButtonsProps } from '@/types';

export default function ActionButtons({
  actionButtons,
  selectedAction,
  setSelectedAction,
  type,
}: UpdatedActionButtonsProps) {
  const taxRevenuesList = useMemo(() => [], []);
  const currencyList = useMemo(() => [], []);
  const filingRevenueType = useMemo(() => [], []);
  const taxOfficeList = useMemo(() => [], []);
  const employeeList = useMemo(() => [], []);
  const daysListData = useMemo(() => [], []);

  if (!actionButtons || actionButtons.length === 0) return null;

  if (type === 'assessment') {
    const statusOptions = [
      { label: 'All', value: 'all', key: 'all' },
      { label: 'Overdue', value: 'overdue', key: 'overdue' },
      { label: 'Completed', value: 'completed', key: 'completed' },
      { label: 'Pending', value: 'pending', key: 'pending' },
    ];

    const handleStatusClick = (value: string) => {
      setSelectedAction({ ...selectedAction, status: value });
    };

    return (
      <div className="px-6 pb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`h-10 px-6 text-sm rounded-md ${
                selectedAction.status === option.value
                  ? 'bg-white text-gray-900 border btn_2 border-gray-300'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
              onClick={() => handleStatusClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SelectDropdown
            button={{ label: 'Date Range: Today', value: 'date-range' }}
            label="Date Range"
            type={type}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
          />
          <SelectDropdown
            button={{ label: 'Tax Type: All Types', value: 'tax-type' }}
            label="Tax Type"
            type={type}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-4 flex items-center gap-2 flex-wrap space-y-3">
      {actionButtons.map((button) => {
        const [label] = button.label.split(': ');
        return (
          <SelectDropdown
            key={button.value}
            button={button}
            label={label}
            type={type}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
          />
        );
      })}
    </div>
  );
}
