import { Button } from '@/components/ui/button'
import React from 'react'

function DunksPage() {
    return (

       <main className="h-full flex justify-center items-center  flex-col">
       
       <div>
        DunksPage 
       </div>
       <button className="px-6 py-2 bg-blue-500 rounded my-3 hover:bg-blue-300">Test button</button>
       <Button variant='outline' size='sm'>Shadcn button</Button>
       
       </main>
    )
}    

export default DunksPage