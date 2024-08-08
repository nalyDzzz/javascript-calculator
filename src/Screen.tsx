
import { useAppSelector } from './app/hooks';


const Screen = () => {

    const calculatorScreenText = useAppSelector((state) => state.calculator.value);
    const concatenatedView = useAppSelector((state) => state.calculator.concatenatedValue)

  return (
    <div className='col-span-6 h-10 row-span-2 text-emerald-500 text-right'>
        <p className='font-mono text-1xl text-yellow-200'>{concatenatedView}</p>
        <p className='font-mono text-2xl text-slate-200'>{calculatorScreenText}</p>
    </div>
  )
}

export default Screen