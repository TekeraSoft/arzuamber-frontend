import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckBoxProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
}

function CheckBox({ id, register, label }: CheckBoxProps) {
  return (
    <div className="flex items-center gap-2 my-3">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        className="w-5 h-5 cursor-pointer accent-secondary   rounded border-gray-300"
      />
      <label
        htmlFor={id}
        className="text-xs md:text-sm font-medium text-gray-700 cursor-pointer capitalize"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
