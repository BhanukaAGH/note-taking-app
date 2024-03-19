import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex items-center gap-2.5'>
      <Image src='/logo.svg' width={20} height={20} alt='logo' priority />
      <h1 className='text-white text-2xl font-bold'>Notes.</h1>
    </div>
  )
}

export default Logo
