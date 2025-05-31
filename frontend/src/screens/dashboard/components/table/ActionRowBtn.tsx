import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { onDashboardActionsModal } from '@/redux/slices/modalSlice';
import { TableActionRowBtnProps } from '@/types';

export default function ActionRowBtn({
  tableData,
  type,
}: TableActionRowBtnProps) {
  const dispatch = useDispatch();

  const dropdownKey = 'id' in tableData ? tableData._id : tableData;

  const handleButtonClick = () => {
    dispatch(onDashboardActionsModal({ transaction: tableData?._id, type }));
  };

  return (
    <Button
      onClick={handleButtonClick}
      key={`button-${dropdownKey}`}
      className="py-2 rounded h-auto cursor-pointer border text-gray-600 shadow-custom-light bg-white hover:text-gray-800 hover:bg-gray-50 btn_2"
    >
      View Details
    </Button>
  );
}
