type TextInputProps = {
    className?: string,
    placeholder?: string,
}

const TextInput = ({className, placeholder}: TextInputProps) => {
    return (
        <input type="text" className={`${className} flex flex-row p-1 bg-background rounded-sm
        text-text text-xl hover:brightness-95 active:brightness-90
         transition duration-100 ease-in-out`} placeholder={placeholder}/>
    );
};

export default TextInput;