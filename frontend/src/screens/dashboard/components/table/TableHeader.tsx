import {
  TableHeader as TableHeaderComponent,
  TableRow,
  TableHead,
} from '@/components/ui/table';
import { TableHeaderProps } from '@/types';

export default function TableHeader({ tableHeaderData }: TableHeaderProps) {
  return (
    <TableHeaderComponent>
      <TableRow className="bg-white shadow-sm mb-4 rounded-md">
        {tableHeaderData.map((header, index) => (
          <TableHead
            key={index}
            className="py-3 px-6 text-sm font-medium text-gray-500 w-[150px] bg-white rounded-md"
          >
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeaderComponent>
  );
}
