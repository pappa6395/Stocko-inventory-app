import { sidebarLinks } from '@/config/sidebar'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { DollarSign, HandCoins, Home, LayoutGrid, Plus } from 'lucide-react'
import Link from 'next/link'


const generalMenu = [
    {

    }

]


export default function QuickAccessMenu() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 
      text-sm/6 font-semibold border rounded-full
      py-2 px-2 dark:bg-neutral-900 dark:text-white"
      >
        <Plus className='size-5' aria-hidden />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max
         -translate-x-64 sm:-translate-x-80 px-4 transition data-[closed]:translate-y-1 
         data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 
         data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-xl 
        bg-white dark:bg-neutral-800 text-sm/6 shadow-lg ring-1 ring-gray-900/5 px-4">
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3">
            <div>
              <div className="flex items-center py-2">
                  <Home className='size-3 mr-1 text-muted-foreground'/>
                  <h2 className='text-base uppercase'>
                      General
                  </h2>
              </div>
              { sidebarLinks.filter(item => !item.dropdown && item.href !== "/dashboard")
              .map((item,i) => {
                      return (
                        <div key={i} >
                          {!item.dropdown ? (
                              <Link href={`${item.href}`} className='flex items-center gap-2 py-2'>
                                  <Plus className='size-3'/>
                                  <span className='text-xs'>{item.label}</span>
                              </Link>
                          ) : ""}
                            
                        </div>
                      )
                  }) }
            </div>
            {
                sidebarLinks.filter(item => item.dropdown).map((item,i) => {
                    const Icon = item.icon;
                    return (
                      
                      <div key={i}>
                        {item.dropdown ? (
                          <div>
                            <div className="flex items-center py-2">
                              <Icon className='size-3 mr-1 text-muted-foreground'/>
                              <h2 className='text-base uppercase'>
                                  {item.label}
                              </h2>
                            </div>
                            {item.dropdownMenu?.map((link, j) => (
                                <Link href={link.href} key={j} className='flex items-center gap-2 py-2'>
                                    <Plus className='size-3'/>
                                    <span className='text-xs'>{link.label}</span>
                                </Link>
                            ))}
                          </div>
                        ) : ""}
                          
                      </div>
                    )
                })
            }
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
