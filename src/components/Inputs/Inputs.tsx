
// Imort Hooks
import React, { useState } from "react"

// Import Select components from shadcn/ui
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// Types
type InputsProps = {
    currencies?: string[],
    input?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSelect?: (value: string) => void,
    preventCurrency?: string
    defaultValue?: string
}

const ExchangeInputs: React.FC<InputsProps> = ({
    currencies,
    input,
    onChange,
    onSelect,
    preventCurrency,
    defaultValue,

}) => {
    // const [input, setInput] = useState("")

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     if ( value === "" || /^\d+(\.\d*)?$/.test(value.trim())) {
    //         const valueFormated = CurrencyFormat(Number(value))
    //         console.log(valueFormated.toString());

    //         setInput(value);   
    //     }
    // }

    return (
        <div className="w-full h-12 rounded-md border-[1.5px] border-zinc-400 hover:border-secundario grid grid-cols-2 gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 pl-4 ">
                <input
                    value={input}
                    onChange={onChange}
                    type="text"
                    className=" outline-none pr-2 border-r-2 h-8 block w-full text-base"
                />
            </div>

            <Select onValueChange={(value) => onSelect?.(value)} defaultValue={defaultValue}>
                <SelectTrigger className="w-full mt-1 border-none text-black box-shadow-none drop-shadow-none rounded-none text-base ">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup>
                        {currencies?.map((currency, idx) => (
                            <SelectItem
                                value={currency}
                                key={idx}
                                disabled={currency == preventCurrency && true}
                            >
                                {currency}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}


export default ExchangeInputs
