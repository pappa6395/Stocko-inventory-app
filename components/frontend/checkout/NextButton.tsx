import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { setActiveStep } from '@/redux/slices/stepSlice';
import React from 'react'

const NextButton = () => {

    const activeStep = useAppSelector((state) => state.step.activeStep);
    const steps = useAppSelector((state) => state.step.steps);

  return (

    <button
        type="submit" 
        className="px-3 py-2 bg-slate-700 rounded-lg w-1/3 sm:w-1/6 active:scale-90">
        <span className='text-sm text-slate-50 
        font-semibold'>
            {activeStep === steps.length ? "Payment" : "Next"}
        </span>
    </button>

  )
}

export default NextButton