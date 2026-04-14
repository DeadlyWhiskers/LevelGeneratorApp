type DropdownProps = {
    className?: string;
    name: string;
    id: string;
    options: { id: string, option: string }[];
}

const Dropdown = ({className, name, id, options}: DropdownProps) => {
    return (
        // <div className='inline-block relative'>
        <select name={name} id={id} className={`${className}
         text-text text-xl p-1 bg-background rounded-sm hover:brightness-95 active:brightness-90 cursor-pointer
         transition duration-100 ease-in-out
         `}>
            {options.map(option => (
                <option value={option.id}>{option.option}</option>
            ))}
        </select>
            // {/*<span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">*/}
            // {/*    ▼*/}
            // {/*</span>*/}
        // {/*</div>*/}
    );
};

export default Dropdown;