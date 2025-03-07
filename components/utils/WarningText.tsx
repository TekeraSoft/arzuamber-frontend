import { Link } from "@/i18n/routing";
import { WarningTextProps } from "@/types/Props";
import { PiSmileySad } from "react-icons/pi";

function WarningText({ title, text, href, buttonText }: WarningTextProps) {
  return (
    <div className="w-full  min-h-[70vh] container mx-auto    flex flex-col justify-center items-center bg-secondary shadow-lg  gap-1 ">
      <PiSmileySad size={110} className="text-mywhite " />
      <h1 className="  md:text-3xl font-extrabold text-mywhite my-4  ">
        {title}
      </h1>
      <p className=" text-sm md:text-lg text-mywhite mb-3 ">{text}</p>
      <Link
        className="bg-mywhite text-secondary font-semibold py-2 px-7 rounded-lg shadow-md transition duration-300 hover:scale-105 text-sm md:text-base "
        href={`${href ? `${href}` : "/"}`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default WarningText;
