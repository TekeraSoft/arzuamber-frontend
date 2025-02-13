// "use client";

// import React, { useState } from "react";
// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// export interface Option {
//   id: string | number;
//   name: string;
// }

// interface DropdownProps {
//   id: string;
//   options: Option[];
//   selectedOption?: string;
//   onSelect: (option: string) => void;
//   placeholder?: string;
//   required?: boolean;
//   errors: FieldErrors<FieldValues>;
//   register: UseFormRegister<FieldValues>;
//   label?: string;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   id,
//   options,
//   selectedOption,
//   onSelect,
//   placeholder = "Select an option",
//   required = false,
//   errors,
//   register,
//   label,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (option: string) => {
//     onSelect(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative w-full">
//       {/* Dropdown Header */}
//       {label && (
//         <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}

//       <div
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="border border-secondary rounded-lg p-3 bg-mywhite cursor-pointer flex justify-between items-center shadow-md"
//       >
//         <span className="text-primary capitalize">
//           {selectedOption || placeholder}
//         </span>
//         <span className="text-secondary">
//           {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//         </span>
//       </div>

//       {/* Dropdown Options */}
//       {isOpen && (
//         <div className="absolute w-full mt-1 bg-mywhite border border-secondary rounded-lg shadow-md z-10 max-h-36 overflow-y-auto ">
//           {options.map((option) => (
//             <div
//               key={option.id}
//               onClick={() => handleSelect(option.name)}
//               className={`p-3 cursor-pointer hover:bg-thirdLight hover:text-mywhite capitalize rounded-md ${
//                 selectedOption === option.name
//                   ? "bg-thirdDark text-mywhite"
//                   : "text-myblack"
//               }`}
//             >
//               {option.name}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Error Message */}
//       {errors && errors[id] && (
//         <p className="text-red-500 text-sm mt-1">{errors.root?.message}</p>
//       )}

//       {/* Register Dropdown */}
//       <select
//         {...register(id, {
//           required: required ? "This field is required !" : false,
//         })}
//         id={id} // Dropdown'ı benzersiz bir şekilde tanımlamak için ID kullanıyoruz
//         className="hidden"
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option.id} value={option.name}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Dropdown;
