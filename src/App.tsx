// Import Components
import Logotype from './components/Logo/Logos';
import ExchangeInputs from './components/Inputs/Inputs';
import { ArrowRightLeft } from "lucide-react";
import CurrencyFormat from './utils/CurrencyFormat';

// Import ExchangeRates components
import { getEchangeRate } from './services/exchange';
import { getAvailableCurrencies } from './services/currencies';

// Import React Query
import { useQuery } from '@tanstack/react-query';

// Import Hooks
import { useState, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';

// Import CSS
import './App.css'


function App() {
  const [input1, setInput1] = useState<string | undefined>("");
  const [input2, setInput2] = useState<string | undefined>("");
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USA");
  const [toCurrency, setToCurrency] = useState("AOA");


  const from = fromCurrency;
  const to = toCurrency;
  const debouncedAmount = useDebounce(amount, 300);

  console.log(from, to);
  

  // Busca lista de moedas (com cache automático)
  const { data: currencies = [], isLoading } = useQuery({
    queryKey: ['currencies'],
    queryFn: getAvailableCurrencies,
    staleTime: 1000 * 60 * 60, // cache por 1h
  });

  const currencyCodes = currencies.map(item => item.code);

  // 
  const { data, isFetched } = useQuery({
    queryKey: ['exchangeRate', from, to, debouncedAmount],
    queryFn: () => getEchangeRate(from, to, debouncedAmount),
    enabled: !!debouncedAmount,
    staleTime: 1000 * 60 * 5, // cache válido por 5 minutos
  });

  // 
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInput1(value);
    const numerico = Number(value.replace(',', '.')); // cuidado com vírgulas
    setAmount(numerico);
  }

  // 
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setInput2(value);
    
  }

  // atualiza input2 sempre que cotação nova chegar
  useEffect(() => {
    if (data !== undefined) {
      const converted = CurrencyFormat(Number(data));
      setInput2(converted);
    } else {
      setInput2("");
    }
  }, [data]);

  return (
    <div className='layout-432:flex items-center layout-432:h-screen justify-center layout-432:bg-primario'>
      <div className='bg-primario h-screen p-4 flex flex-col items-center layout-432:w-[20rem] layout-432:h-[35rem] layout-432:m-auto layout-432:bg-white  layout-432:rounded-xl layout-432:drop-shadow-xl  '>

        <Logotype margin='mt-20' />

        <div className=' w-full grow flex flex-col justify-center '>
          <div className='bg-white p-6 h-[25rem] rounded-xl drop-shadow-2xl layout-432:drop-shadow-none pt-14'>
            <h2 className='text-xl font-bold mb-2'>Conversor de moedas</h2>
            <p className='text-base text-zinc-500'>Digite o valor e escolha as moedas de Conversão</p>

            <div className='mt-10 flex flex-col items-center gap-3  '>
              <ExchangeInputs
                input={input1}
                onChange={handleInputChange1}
                currencies={currencyCodes}
                onSelect={(value)=> setFromCurrency(value)}
                preventCurrency={toCurrency}
              />

              <ArrowRightLeft />

              <ExchangeInputs
                input={input2}
                onChange={handleInputChange2}
                currencies={currencyCodes}
                onSelect={(value)=> setToCurrency(value)}
                preventCurrency={fromCurrency}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
