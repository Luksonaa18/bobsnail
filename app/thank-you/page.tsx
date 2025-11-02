"use client"
import { useRouter } from 'next/navigation'


const page = () => {
    const router = useRouter()
    
  return (
    <>
    <div className='w-full h-screen flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-3xl'>Order Created</h1>
      <button className='cursor-pointer text-white w-20 h-10 rounded-lg border bg-orange-500' onClick={()=>router.push('/')}>Home</button>
    </div>
    </>
  )
}

export default page