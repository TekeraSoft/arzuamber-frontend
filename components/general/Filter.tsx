import { RootState } from "@/store/store";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import Dropdown from "./DropDown";
import Input from "./Input";
import { toast } from "react-toastify";
// import Heading from "./Heading";

function Filter() {
  const { categories } = useSelector((state: RootState) => state.categories);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      images: [],
      inStock: false,
      isNewSeason: false,
      discountPercent: 0,
      price: null,
    },
  });

  const setCustomValue = (id: string, value: string | number | boolean) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // Filter Form Submit
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    try {
      const formData = { ...data };
      console.log("Form Data", formData);

      toast.success("Filtering successful!");
    } catch (error) {
      console.error(error);
      toast.error("Filtreing unsuccessful!");
    }
  };

  // Filtering by category
  const category = watch("category");

  return (
    <div className="w-1/6 h-full bg-gray-100 rounded-md flex flex-col justify-start items-center p-2">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* <Heading /> */}
      </form>
      <Input
        placeholder="Name"
        id="name"
        type=""
        errors={errors}
        register={register}
      />

      <Dropdown
        id="category"
        errors={errors}
        register={register}
        onSelect={(option) => setCustomValue("category", option)}
        options={categories}
        placeholder="Select Category"
        selectedOption={category}
      />
    </div>
  );
}

export default Filter;
