import React from "react";
import { CircleFadingPlus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

const AddNewCard = () => {
  return (
    <DialogTrigger asChild>
      <div className="max-w-60 flex flex-col gap-2">
        <div className="relative flex w-full h-75 aspect-[2/2.51] items-center justify-center bg-card hover:bg-accent rounded-md cursor-pointer shadow-lg group">
          <div className="group-hover:scale-130 transition-all duration-300 ease-in-out">
            <CircleFadingPlus size={50} className="text-foreground" />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-1 rounded-md">
          <div className="bg-card hover:bg-accent h-4 w-full rounded-2xl" />
          <div className="bg-card hover:bg-accent  h-4 w-1/2 rounded-2xl" />
          <div className="flex flex-row justify-between mt-2.5">
            <div className="bg-card hover:bg-accent h-4 w-1/3 rounded-2xl" />
            <div className="bg-card hover:bg-accent h-4 w-1/4 rounded-2xl" />
          </div>
        </div>
      </div>
    </DialogTrigger>
  );
};

export default AddNewCard;
