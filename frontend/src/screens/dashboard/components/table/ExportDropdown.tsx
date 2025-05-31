import {
  RiDownloadFill,
} from '@remixicon/react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function ExportDropdown() {
  const handleExport = (format: string) => {
    if (format === 'csv') {
      console.log('Exporting as CSV...');
    } else if (format === 'pdf') {
      console.log('Exporting as PDF...');
    }
  };

  return (
    <Select onValueChange={(value) => handleExport(value)}>
      <SelectTrigger className="h-10 px-2 text-sm text-gray-600 border border-gray-200 rounded-md bg-white cursor-pointer">
        <RiDownloadFill className="w-4 h-4 text-gray-600" />
        <SelectValue placeholder="Export" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="csv">Export as CSV</SelectItem>
        <SelectItem value="pdf">Export as PDF</SelectItem>
      </SelectContent>
    </Select>
  );
}
