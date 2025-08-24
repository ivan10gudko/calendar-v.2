type Props = {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    required: boolean;
};

const TextInput: React.FC<Props> = ({type="text", placeholder, value, onChange,required }) => {
    return (
        <input
                        type={type}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                        placeholder={placeholder}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        required={required}
                    />
    );
};

export default TextInput;
