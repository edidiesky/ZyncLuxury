import { SelectedAction, ActionButton } from '@/types';

interface ActionButtonGroupProps {
  actionButtons: ActionButton[];
  selectedAction: SelectedAction;
  setSelectedAction: (value: SelectedAction) => void;
}

export default function ActionButtonGroup({
  actionButtons,
  selectedAction,
  setSelectedAction,
}: ActionButtonGroupProps) {
  const updateSelectedAction = (buttonValue: string, value: string) => {
    setSelectedAction({
      ...selectedAction,
      admin_assessment: value,
    });
  };

  return (
    <div className="px-6 pb-4 flex items-center gap-2">
      <div className="flex items-center gap-2">
        {actionButtons.map((button) => (
          <button
            key={button.value}
            className={`h-10 px-6 text-sm border-none shadow-none bg-gray-50 ${
              selectedAction['admin_assessment'] === button.value
                ? ' text-gray-900 hover:bg-gray-100 btn_2'
                : 'text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-600'
            }`}
            onClick={() =>
              updateSelectedAction('assessment', button.value)
            }
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
