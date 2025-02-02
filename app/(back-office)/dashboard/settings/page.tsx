import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const page = () => {
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
      )

  return (

    <div>
        <div className='grid grid-cols-[220px_1fr]'>
            <div className='border-r'>
                <ScrollArea className="h-96 w-48 rounded-md border-none">
                    <div className='p-4'>
                        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                        {tags.map((tag, j) => {
                            return (
                                <div key={j} >
                                    <div className="hover:bg-slate-200">
                                    {tag}
                                    </div>
                                    <Separator className='my-2'/>
                                </div>
                                
                            )
                        })}
                        
                    </div>    
                </ScrollArea>
            </div>
            <div className='p-4'>
                <div className=''>
                    Hello
                </div>
                
            </div>
        </div>
    </div>

  )
}

export default page