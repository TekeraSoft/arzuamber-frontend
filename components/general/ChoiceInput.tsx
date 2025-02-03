interface ChoiceInputProps {
  text: string;
  onClick: (value: string) => void;
  selected?: boolean;
}

function ChoiceInput({ text, onClick, selected }: ChoiceInputProps) {
  return (
    <div
      onClick={() => onClick(text)}
      className={`flex flex-col items-center justify-center gap-2 h-12 w-28 p-4 border rounded-lg cursor-pointer transition-all duration-300 capitalize ${
        selected
          ? "border-primary bg-primaryLight text-white"
          : "border-gray-300 bg-white text-gray-600 hover:shadow-md"
      }`}
    >
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
}

export default ChoiceInput;
