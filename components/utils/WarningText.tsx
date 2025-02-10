interface WarningTextProps {
  title: string;
  text: string;
}

function WarningText({ title, text }: WarningTextProps) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primaryLight p-8 rounded-lg shadow-xl ">
      <h1 className="text-4xl font-extrabold text-mywhite mb-6  ">{title}</h1>
      <p className="text-xl text-mywhite  ">{text}</p>
    </div>
  );
}

export default WarningText;
