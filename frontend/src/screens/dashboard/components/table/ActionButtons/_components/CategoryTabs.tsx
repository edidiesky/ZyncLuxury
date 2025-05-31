import { Button } from '@/components/ui/button';
import { SelectedAction } from '@/types';

interface CategoryTabsProps {
  label: string;
  selectedAction: SelectedAction;
  setSelectedAction: (value: SelectedAction) => void;
}

export default function CategoryTabs({
  label,
  selectedAction,
  setSelectedAction,
}: CategoryTabsProps) {
  const tabs = [
    { label: 'All', value: 'all-categories' },
    { label: 'Individual', value: 'individual' },
    { label: 'Corporate', value: 'corporate' },
  ];
  const selectedIndex = tabs.findIndex(
    (tab) => tab.value === selectedAction['category']
  );

  const updateSelectedAction = (value: string) => {
    setSelectedAction({
      ...selectedAction,
      category: value,
    });
  };

  return (
    <div className="flex items-center gap-2 mr-3 relative">
      <p className="text-sm text-gray-500">{label}: </p>
      <div className="flex items-center gap-2 text-gray-500 px-4 py-2 border h-10 border-[#CDD0D5] rounded-md relative">
        <div className="relative flex items-center gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={
                selectedAction['category'] === tab.value ? 'default' : 'outline'
              }
              className={`px-6 text-sm rounded-md relative z-10 flex-1 min-w-[100px] ${
                selectedAction['category'] === tab.value
                  ? 'bg-white text-gray-900 hover:bg-gray-50 btn_2 border-none shadow-none'
                  : 'shadow-none bg-inherit text-gray-400 cursor-pointer border-none hover:bg-gray-50 hover:text-gray-600'
              }`}
              onClick={() => updateSelectedAction(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
          <div
            className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-300 ease-in-out z-50"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${selectedIndex * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
