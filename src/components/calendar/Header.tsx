import React from "react";
import Logo from "./Logo";
import Select from "./Select";
import { capitalizeFistLetter } from "../../helpers/String";

interface HeaderProps {
  calendarMode: "month" | "week" | "day";
  setCalendarMode: React.Dispatch<
    React.SetStateAction<"month" | "week" | "day">
  >;
}

const Header: React.FC<HeaderProps> = ({ calendarMode, setCalendarMode }) => {
   return (
    <header className="p-4 px-16 bg-gray-50 flex justify-between items-center border-b border-gray-200">
        <Logo />
        <Select
            placeholder="Select view"
            selected={{
                title: capitalizeFistLetter(calendarMode),
                value: calendarMode,
            }}
            options={[
                { title: "Month", value: "month" },
                { title: "Week", value: "week" },
                { title: "Day", value: "day" },
            ]}
            onChange={(selected) =>
                setCalendarMode(selected as "month" | "week" | "day")
            }
        />
    </header>
  );
};

export default Header;
