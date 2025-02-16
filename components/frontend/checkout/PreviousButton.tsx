import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setActiveStep } from '@/redux/slices/stepSlice';
import React from 'react'

const PreviousButton = () => {

    const activeStep = useAppSelector((state) => state.step.activeStep);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (activeStep > 1) {
            dispatch(
                setActiveStep(activeStep - 1)
            );
        }  else {
            console.log('Cannot go back');
        }
    }

  return (

    <button
        disabled={activeStep === 1} 
        type="button" 
        onClick={handleClick} 
        className="px-2 py-2 bg-slate-700 rounded-lg w-1/3 sm:w-1/6 active:scale-90">
        <span className='text-sm text-slate-50 
        font-semibold'>
            Previous
        </span>
    </button>

  )
}

export default PreviousButton