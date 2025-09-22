import { useCallback, useState, useRef } from "react";
import { useController } from "react-hook-form";
import { Download, UploadCloudIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Use the provided Input component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { showCustomToast } from "@/components/common/CustomToast";

export const ListingFormInput = ({
  control,
  name,
  label,
  type = "text",
  disabled = false,
  placeholder,
  options = [],
  required = false,
  onFileDownload,
  onFileChange,
  onValueChange,
}) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = useCallback(
    async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];

        if (!selectedFile.name.endsWith(".csv")) {
          showCustomToast("File must be in CSV format", "error");
          if (onFileChange) await onFileChange(null);
          field.onChange("");
          setFileName("");
          return;
        }

        const maxSizeMB = 5;
        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
          showCustomToast(`File size should not exceed ${maxSizeMB}MB`, "error");
          if (onFileChange) await onFileChange(null);
          field.onChange("");
          setFileName("");
          return;
        }

        setFileName(selectedFile.name);
        field.onChange(selectedFile.name);
        showCustomToast("File selected successfully!", "success");
        if (onFileChange) await onFileChange(selectedFile);
      } else {
        field.onChange("");
        setFileName("");
        if (onFileChange) await onFileChange(null);
      }
    },
    [field, onFileChange]
  );

  const renderInput = () => {
    if (type === "select") {
      return (
        <Select
          onValueChange={field.onChange}
          value={field.value || ""}
          required={required}
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger
              className="w-full min-h-[50px] rounded-[100px] border border-[rgba(0,0,0,0.2)] bg-transparent text-sm font-semibold text-black px-4 py-1 transition-all duration-300 focus:outline-none focus:shadow-[0_0_0_6px_#ccc] focus:outline-[1px_solid_#090825] hover:shadow-[0_0_0_6px_#ccc] hover:outline-[1px_solid_#090825]"
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (type === "textarea") {
      return (
        <FormControl>
          <ReactQuill
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["link"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
            className="w-full min-h-[170px] border pb-4 rounded-2xl overflow-hidden"
          />
        </FormControl>
      );
    }

    if (type === "number") {
      return (
        <FormControl>
          <div className="relative">
            <Input
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              name={field.name}
              value={field.value || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, "");
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  field.onChange(value);
                }
              }}
              className="min-h-[50px] rounded-[100px] border-[1.5px] border-[rgba(0,0,0,0.2)] bg-transparent text-black font-semibold text-base px-4 py-1 transition-all duration-300 focus:shadow-[0_0_0_6px_#ccc] focus:outline-[1px_solid_#090825] hover:shadow-[0_0_0_6px_#ccc] hover:outline-[1px_solid_#090825] disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </FormControl>
      );
    }

    if (type === "file") {
      return (
        <>
          <FormControl>
            <div
              className="border border-dashed border-[rgba(0,0,0,0.2)] w-full flex flex-col gap-y-5 items-center justify-center rounded-2xl bg-transparent text-black font-semibold px-4 py-2 transition-all duration-300 hover:shadow-[0_0_0_6px_#ccc] hover:outline-[1px_solid_#090825]"
            >
              {fileName ? (
                <div className="w-full flex flex-col gap-1 justify-center items-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-[#eee]">
                    <img
                      src="/assets/icons/csv_2.png"
                      alt="CSV Icon"
                      className="w-12"
                    />
                  </div>
                  <h5 className="text-sm text-center">{fileName}</h5>
                </div>
              ) : (
                <div className="flex flex-col gap-y-5 items-center justify-center p-4">
                  <UploadCloudIcon className="text-gray-600" size={24} />
                  <p className="text-sm text-gray-900">Choose a file or drag & drop it here.</p>
                  <span className="text-xs text-gray-400">Image formats, up to 5MB.</span>
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="png, jpg, jpeg"
                    disabled={disabled}
                  />
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="text-sm text-gray-600 py-1.5 px-5 rounded-[100px] hover:bg-gray-100 border border-[rgba(0,0,0,0.2)] cursor-pointer btn_2"
                    type="button"
                    disabled={disabled}
                  >
                    Browse File
                  </button>
                </div>
              )}
            </div>
          </FormControl>
          {onFileDownload && (
            <div className="mt-4 flex items-center justify-center">
              <Button
                type="button"
                onClick={onFileDownload}
                className="h-[50px] px-4 flex items-center gap-2 bg-orange-600 text-white rounded-[100px] btn_2 hover:bg-orange-700"
              >
                <Download className="w-4 h-4" />
                Download Template
              </Button>
            </div>
          )}
        </>
      );
    }

    if (type === "text") {
      return (
        <FormControl>
          <div className="relative">
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              name={field.name}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              className="min-h-[50px] rounded-[100px] text-base border-[1.5px] border-[rgba(0,0,0,0.3)] bg-transparent text-black font-semibold px-4 py-1 transition-all duration-300 focus:shadow-[0_0_0_6px_#ccc] focus:outline-[1px_solid_#090825] hover:shadow-[0_0_0_6px_#ccc] hover:outline-[1px_solid_#090825] disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </FormControl>
      );
    }
  };

  return (
    <FormItem className="space-y-1">
      <FormLabel className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      {renderInput()}
      {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
    </FormItem>
  );
};