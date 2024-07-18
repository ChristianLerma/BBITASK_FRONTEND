import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLayout() {
  return (
    <>
        <div className='bg-neutral-500 min-h-screen'>
            <div className='py-10 lg:py-20 mx-auto w-[450px]'>
                <div className='mt-10 items-center'>
                    <div className='pb-5 pl-20'>
                        <Logo />
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>

        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
