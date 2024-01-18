import React, { useRef, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useOutsideClick from "~/hooks/useOutsideClick";

const DatePicker = ({
  date: initDate,
  setDate,
}: {
  date: Date | null;
  setDate: (e: any) => void;
}) => {
  const [show, setShow] = useState(false);
  const selectedDate = initDate ?? null;
  const datePickerRef = useRef(null);

  useOutsideClick({
    ref: datePickerRef,
    callback: () => {
      if (show) {
        setShow(false);
      }
    },
  });

  return (
    <div ref={datePickerRef} className="relative">
      <Button
        variant={"secondary"}
        className="w-56 text-brand-dark"
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        {selectedDate ? format(selectedDate, "dd MMM, yyyy") : "Select a Date"}{" "}
        <CalendarIcon className="ml-4 h-4 w-4" />
      </Button>
      <div
        className={`z-10 bg-white ${
          show ? "absolute " : "hidden"
        } rounded-lg shadow-lg`}
      >
        <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={(date) => {
            setDate(date ?? null);
          }}
          disabled={(date) => date <= new Date()}
        />
      </div>
    </div>
  );
};

export default DatePicker;
