import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

// Define the shape of each item in the list
interface ISelectItem {
  value: string;
  label: string;
}

interface ITextField {
  name: string;
  label?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: ISelectItem[]; // Updated to accept an array of key-label pairs
}

const CustomSelectField = ({
  name,
  label,
  variant = "default",
  size = "md",
  required = false,
  icon,
  placeholder,
  items,
  fullWidth,
  onClick,
  onChange,
}: ITextField) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Store the display label

  const inputSizeClass = {
    sm: "py-1 px-1.5 text-sm",
    md: "py-[5px] px-1.5 text-base",
    lg: "py-2 px-1.5 text-lg",
  }[size];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  const handleSelect = (
    item: ISelectItem,
    fieldOnChange: (value: string) => void
  ) => {
    setSelectedItem(item.label); // Display the label to the user
    fieldOnChange(item.value); // Pass the key to the form
    setIsOpen(false);
    if (onChange) {
      const event = {
        target: { value: item.value },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <div className={`w-full relative`}>
      {label && (
        <label htmlFor={name} className="block text-gray-950 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          // Find the display label based on the form's current key value
          const selectedDisplayLabel =
            selectedItem ||
            items.find((item) => item.value === field.value)?.label ||
            placeholder;

          return (
            <div className="relative">
              {/* Dropdown Trigger */}
              <div
                className={`${
                  fullWidth ? "w-full" : "w-auto"
                } flex items-center ${
                  variant === "outline"
                    ? "bg-transparent border-b rounded-none"
                    : "border rounded-lg"
                } ${
                  error ? "border-red-500" : "border-[#DDDDDD]"
                } ${inputSizeClass}`}
                onClick={toggleDropdown}
              >
                {icon && <div className="pl-2">{icon}</div>}
                <button
                  type="button"
                  className={`w-full text-left outline-none cursor-pointer ${
                    placeholder && !field.value ? "text-gray-500" : "text-gray-900"
                  } ${inputSizeClass}`}
                >
                  {selectedDisplayLabel}
                </button>
                <div className="pr-2">
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Animated Dropdown Menu */}
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute z-10 w-full mt-1 bg-white border border-[#DDDDDD] rounded-xl shadow-lg max-h-60 overflow-auto ${
                      variant === "outline" ? "border-b" : ""
                    }`}
                  >
                    {items.map((item) => (
                      <motion.li
                        key={item.value} // Use the key for uniqueness
                        whileHover={{ backgroundColor: "#f1f5f9" }}
                        className="px-4 py-2 text-gray-900 cursor-pointer"
                        onClick={() => handleSelect(item, field.onChange)}
                      >
                        {item.label} {/* Display the label to the user */}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomSelectField;