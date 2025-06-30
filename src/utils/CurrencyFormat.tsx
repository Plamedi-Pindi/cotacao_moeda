

const CurrencyFormat = (value: number)=> {
    return new Intl.NumberFormat('Pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
} 

export default CurrencyFormat