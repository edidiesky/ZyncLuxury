import {
  RiCheckboxCircleFill,
  RiTimeFill,
  RiCloseCircleFill,
  RiForbidFill,
} from "@remixicon/react";
export const getStatusStyles = (status) => {
  switch (status) {
    case "PENDING":
      return "text-orange-600 border-orange-300";
    case "FAILED":
    case "CANCELLED":
      return "text-red-600 border-red-300";
    case "SENT":
    case "COMPLETED":
    case "REMITTED":
    case "APPROVED":
      return "text-green-300 border-green-300";
    default:
      return "text-gray-600";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "OVERDUE":
    case "FAILED":
    case "CANCELLED":
      return <RiCloseCircleFill className="w-5 h-5 text-red-600 mr-2" />;
    case "COMPLETED":
    case "APPROVED":
    case "SUBMITTED":
      return <RiCheckboxCircleFill className="w-5 h-5 text-green-300 mr-2" />;
    case "PENDING":
    case "INITIATED":
      return <RiTimeFill className="w-5 h-5 text-orange-600 mr-2" />;
    case "NOT FILED":
      return <RiForbidFill className="w-5 h-5 text-gray-600 mr-2" />;
    default:
      return null;
  }
};

export const renderStatus = (status) => {
  if (!status) {
    return (
      <span className="inline-flex items-center text-sm  font-medium border rounded-sm py-1 px-3 border-gray-100 text-red-600">
        Unknown
      </span>
    );
  }
  const statusStyles = getStatusStyles(status);
  const icon = getStatusIcon(status);

  return (
    <span
      className={`inline-flex items-center text-sm font-medium border rounded-sm py-2 px-3 border-gray-100 ${statusStyles}`}
    >
      {icon}
      <>{status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</>
    </span>
  );
};
