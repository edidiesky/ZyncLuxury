'use client';
import { SortDesc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortBySelectProps {
  onSortChange: (value: 'recent' | 'oldest') => void;
}

export default function SortBySelect({ onSortChange }: SortBySelectProps) {
  return (
    <div className="relative w-32">
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-full h-10 rounded-md border-[#E5E7EB] bg-white text-sm pl-10">
          <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Recent</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
