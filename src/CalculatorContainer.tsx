
import Screen from './Screen'
import CalculatorButtons from './CalculatorButtons'


const CalculatorContainer = () => {
  return (
    <div className='border border-black rounded bg-neutral-800 mt-3 grid grid-cols-6 grid-rows-12 grid-flow-col p-1 h-96'>
        <Screen />
        <div className='row-start-3 row-span-10 grid col-span-6 grid-cols-4 gap-1'>
          <CalculatorButtons />
        </div>
        
    </div>
  )
}

export default CalculatorContainer