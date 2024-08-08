
import { useAppSelector } from './app/hooks';


const Screen = () => {

    const currentVal = useAppSelector((state) => state.calculator.currVal);
    const fullValueView = useAppSelector((state) => state.calculator.fullValueDisplay)

  return (
    <div className='col-span-6 h-10 row-span-2 text-emerald-500 text-right'>
        <p  className='font-mono text-1xl text-yellow-200'>{fullValueView}</p>
        <p id='display' className='font-mono text-2xl text-slate-200'>{currentVal}</p>
    </div>
  )
}

export default Screen