import {colors, dfFilter} from "@/data/filterData";
import {FaMinus, FaPlus, FaTimes} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useTranslations} from "next-intl";
import {AppDispatch, RootState} from "@/store/store";
import {useEffect, useState} from "react";
import {setFilterStatus} from "@/store/searchSlice";

function DfFilter({ gender,size,color,setGender, setSize, setColor }: {
    gender: string;
    size: string;
    color: string;
    setGender: (value: string | null) => void; // Update prop types for clarity
    setSize: (value: string | null) => void;   // Allow null
    setColor: (value: string | null) => void;  // Allow null
}) {
    const dispatch = useDispatch<AppDispatch>()
    const t = useTranslations();
    const { filterStatus } = useSelector((state: RootState) => state.search);

    const [openState, setOpenState] = useState({
        gender: true,
        size: true,
        color: false,
    });

    return (
        <div className="relative lg:w-1/4 z-40">

            {/* Mobile Filter */}
            <div
                className={`fixed inset-0 backdrop-blur-sm z-50 lg:hidden transform transition-transform   ${
                    filterStatus
                        ? "translate-x-0 animate__fadeInLeft animate__animated animate__faster"
                        : "-translate-x-full "
                }`}
                onClick={() => dispatch(setFilterStatus(!filterStatus))}
            >
                <div
                    className="bg-white flex flex-col gap-5 p-6 w-3/4 max-w-96 h-full z-2 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col justify-center items-end mt-40 md:mt-48 w-full">
                        <button
                            onClick={() => dispatch(setFilterStatus(!filterStatus))}
                            className="w-6 h-6 lg:hidden p-1 text-primary border border-primary rounded-md flex justify-center items-center bg-mywhite transition-all duration-500 hover:scale-105"
                        >
                            <FaTimes size={16} />
                        </button>
                        <h3 className="text-center text-2xl font-bold text-primary w-full border-b border-secondary">
                            {t("Filter.title")}
                        </h3>
                    </div>

                    <div className="w-full flex flex-col gap-2">

                        {/* gender for Mobile */}
                        <div className={"flex flex-col"}>
                            <div
                                className={
                                    "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                                }
                                onClick={() =>
                                    setOpenState({ ...openState, gender: !openState.gender })
                                }
                            >
                                <h3 className={"text-lg font-semibold"}>{t("Filter.sizes")}</h3> {/* You might want to change this translation key for gender */}
                                {openState.gender ? (
                                    <FaMinus className={"font-semibold"} />
                                ) : (
                                    <FaPlus className={" font-semibold"} />
                                )}
                            </div>
                            <ul
                                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                                    openState.gender ? "max-h-[1000px]" : "max-h-0"
                                } flex flex-col h-full`}
                            >
                                {dfFilter.gender.map((g, index) => (
                                    <li key={index} className="flex flex-row gap-x-3">
                                        <input
                                            type="checkbox"
                                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                            checked={gender === g}
                                            value={g} // Use 'g' as value, not 'gender'
                                            onChange={() => setGender(gender === g ? null : g)} // **TOGGLE LOGIC HERE**
                                        />
                                        <label
                                            className={`font-medium transition-all duration-300 text-sm ${
                                                gender === g
                                                    ? "text-primary font-bold"
                                                    : "text-gray-500 font-thin"
                                            }`}
                                        >
                                            {g}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <hr className={"bg-secondaryDark mt-1"} />
                        </div>

                        {/* Bedenler (Sizes) for Mobile */}
                        <div className={"flex flex-col"}>
                            <div
                                className={
                                    "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                                }
                                onClick={() =>
                                    setOpenState({ ...openState, size: !openState.size })
                                }
                            >
                                <h3 className={"text-lg font-semibold"}>{t("Filter.sizes")}</h3>
                                {openState.size ? (
                                    <FaMinus className={"font-semibold"} />
                                ) : (
                                    <FaPlus className={" font-semibold"} />
                                )}
                            </div>
                            <ul
                                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                                    openState.size ? "max-h-[1000px]" : "max-h-0"
                                } flex flex-col h-full`}
                            >
                                {dfFilter.size.map((s, index) => (
                                    <li key={index} className="flex flex-row gap-x-3">
                                        <input
                                            type="checkbox"
                                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                            checked={size === s}
                                            value={s} // Use 's' as value, not 'size'
                                            onChange={() => setSize(size === s ? null : s)} // **TOGGLE LOGIC HERE**
                                        />
                                        <label
                                            className={`font-medium transition-all duration-300 text-sm ${
                                                size === s
                                                    ? "text-primary font-bold"
                                                    : "text-gray-500 font-thin"
                                            }`}
                                        >
                                            {s}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <hr className={"bg-secondaryDark mt-1"} />
                        </div>

                        {/* Renkler (Colors) for Mobile */}
                        <div className={"flex flex-col"}>
                            <div
                                className={
                                    "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                                }
                                onClick={() =>
                                    setOpenState({ ...openState, color: !openState.color })
                                }
                            >
                                <h3 className={"text-lg font-semibold"}>{t("Filter.colors")}</h3>
                                {openState.color ? (
                                    <FaMinus className={"font-semibold"} />
                                ) : (
                                    <FaPlus className={" font-semibold"} />
                                )}
                            </div>
                            <ul
                                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                                    openState.color ? "max-h-[1000px]" : "max-h-0"
                                } flex flex-col`}
                            >
                                {colors.map((c, index) => (
                                    <li
                                        key={index}
                                        className={"flex flex-row justify-start items-center gap-x-2"}
                                    >
                                        <input
                                            type="checkbox"
                                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                            checked={color === c.name}
                                            value={c.name}
                                            onChange={() => setColor(color === c.name ? null : c.name)} // **TOGGLE LOGIC HERE**
                                        />
                                        <label
                                            className={`font-medium transition-all duration-300 text-base ${
                                                color === c.name
                                                    ? "text-primary font-bold"
                                                    : "text-gray-500 font-thin"
                                            }`}
                                        >
                                            {c.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <hr className={"bg-secondaryDark mt-1"} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Filter */}
            <div className="hidden lg:flex flex-col gap-4 w-3/4 min-h-96">
                <h3 className="text-center text-2xl font-bold text-primary border-b border-secondary">
                    {t("Filter.title")}
                </h3>

                <div className={"flex flex-col"}>
                    <div
                        className={
                            "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                        }
                        onClick={() =>
                            setOpenState({ ...openState, gender: !openState.gender })
                        }
                    >
                        <h3 className={"text-lg font-semibold"}>Cinsiyet</h3>
                        {openState.gender ? (
                            <FaMinus className={"font-semibold"} />
                        ) : (
                            <FaPlus className={" font-semibold"} />
                        )}
                    </div>
                    <ul
                        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                            openState.gender ? "max-h-[1000px]" : "max-h-0"
                        } flex flex-col h-full`}
                    >
                        {dfFilter.gender.map((g, index) => (
                            <li key={index} className="flex flex-row gap-x-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                    checked={gender === g}
                                    value={g} // Use 'g' as value, not 'gender'
                                    onChange={() => setGender(gender === g ? null : g)} // **TOGGLE LOGIC HERE**
                                />
                                <label
                                    className={`font-medium transition-all duration-300 text-sm ${
                                        gender === g
                                            ? "text-primary font-bold"
                                            : "text-gray-500 font-thin"
                                    }`}
                                >
                                    {g}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <hr className={"bg-secondaryDark mt-1"} />
                </div>

                {/* Bedenler (Sizes) for Desktop */}
                <div className={"flex flex-col"}>
                    <div
                        className={
                            "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                        }
                        onClick={() =>
                            setOpenState({ ...openState, size: !openState.size })
                        }
                    >
                        <h3 className={"text-lg font-semibold"}>{t("Filter.sizes")}</h3>
                        {openState.size ? (
                            <FaMinus className={"font-semibold"} />
                        ) : (
                            <FaPlus className={" font-semibold"} />
                        )}
                    </div>
                    <ul
                        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                            openState.size ? "max-h-[1000px]" : "max-h-0"
                        } flex flex-col h-full`}
                    >
                        {dfFilter.size.map((s, index) => (
                            <li key={index} className="flex flex-row gap-x-3">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                    checked={size === s}
                                    value={s} // Use 's' as value, not 'size'
                                    onChange={() => setSize(size === s ? null : s)} // **TOGGLE LOGIC HERE**
                                />
                                <label
                                    className={`font-medium transition-all duration-300 text-sm ${
                                        size === s
                                            ? "text-primary font-bold"
                                            : "text-gray-500 font-thin"
                                    }`}
                                >
                                    {s}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <hr className={"bg-secondaryDark mt-1"} />
                </div>

                {/* Renkler (Colors) for Desktop */}
                <div className={"flex flex-col"}>
                    <div
                        className={
                            "flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
                        }
                        onClick={() =>
                            setOpenState({ ...openState, color: !openState.color })
                        }
                    >
                        <h3 className={"text-lg font-semibold"}>{t("Filter.colors")}</h3>
                        {openState.color ? (
                            <FaMinus className={"font-semibold"} />
                        ) : (
                            <FaPlus className={" font-semibold"} />
                        )}
                    </div>
                    <ul
                        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                            openState.color ? "max-h-[1000px]" : "max-h-0"
                        } flex flex-col`}
                    >
                        {colors.map((c, index) => (
                            <li
                                key={index}
                                className={"flex flex-row justify-start items-center gap-x-2"}
                            >
                                <input
                                    type="checkbox"
                                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                                    checked={color === c.name}
                                    value={c.name}
                                    onChange={() => setColor(color === c.name ? null : c.name)} // **TOGGLE LOGIC HERE**
                                />
                                <label
                                    className={`font-medium transition-all duration-300 text-base ${
                                        color === c.name
                                            ? "text-primary font-bold"
                                            : "text-gray-500 font-thin"
                                    }`}
                                >
                                    {c.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <hr className={"bg-secondaryDark mt-1"} />
                </div>
            </div>
        </div>
    );
}

export default DfFilter;