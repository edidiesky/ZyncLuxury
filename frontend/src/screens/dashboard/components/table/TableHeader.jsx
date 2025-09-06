import {
  TableHeader as TableHeaderComponent,
  TableRow,
  TableHead,
} from "@/components/ui/table";
export default function TableHeader({ tableHeaderData }) {
  return (
    <TableHeaderComponent>
      <TableRow className="rounded-md ">
        {tableHeaderData.map((header, index) => {
          const isMobileHidden =
            index !== 0 && index !== 1 && index !== tableHeaderData.length - 1;
          return (
            <TableHead
              key={index}
              className={`py-3 px-2 border-b pb-4 md:px-6 text-sm uppercase font-bold text-[#000] whitespace-nowrap overflow-hidden text-start`}
            >
              {header}
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeaderComponent>
  );
}
