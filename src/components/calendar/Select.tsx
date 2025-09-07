import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Option {
    title: string;
    value: string;
}

interface Props {
    placeholder: string;
    options: Array<Option>;
    selected: Option | null;
    onChange: (selected: Option["value"]) => void;
    onClose?: () => void;
}
const Select: React.FC<Props> = ({
    placeholder,
    options,
    selected,
    onChange,
    onClose,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                if (isOpen) onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);

    }, [isOpen, onClose]);

    const styles = `pointer relative border border-black/60 bg-gray-50 ${
    isOpen ? "rounded-t-3xl" : "rounded-3xl"
    } cursor-pointer select-none hover:shadow-md transition-shadow duration-150`;

    return (
        <div className={styles} ref={rootRef} onClick={() => setIsOpen(!isOpen)}>
            <div className="py-2 w-30 text-center ">
                {selected?.title || placeholder} <ArrowDropDownIcon />
            </div>
            {isOpen && (
                <ul className="absolute border divide-y rounded-b-xl w-30 border-black/60 divide-black/60">
                    {options.map((option) => (
                        <Option key={option.value} option={option} onChange={onChange} />
                    ))}
                </ul>
            )}
    </div>
    );
};

const Option: React.FC<{
    option: Option;
    onChange: (selected: Option["value"]) => void;
}> = ({ option, onChange }) => {
    return (
        <div
            className="cursor-pointer hover:bg-gray-150 w-full py-2 text-center last:rounded-b-xl transform:translate-x-10 transition bg-gray-50 duration-100"
            onClick={() => onChange(option.value)}
        >
            {option.title}
        </div>
    );
};

export default Select;
