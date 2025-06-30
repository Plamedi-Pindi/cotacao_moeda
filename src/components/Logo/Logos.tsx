import { ArrowUpDown } from "lucide-react";
import type React from "react";

type LogotypeProps = {
  margin?: string; 
};

const Logotype: React.FC<LogotypeProps> = ({margin = " "}) => {
    return (
        <div className= {`flex items-center gap-2 ${margin}`}  >
            <ArrowUpDown color="#7C3AED" size={20}  />
            <h1 className="text-secundario font-bold text-2xl">Cotação de Moedas</h1>
        </div>
    )
}

export default Logotype;