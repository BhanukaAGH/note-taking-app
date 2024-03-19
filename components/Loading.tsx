import Logo from './Logo'

const Loading = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-black text-white'>
      <div className='scale-125 animate-pulse transition-all'>
        <Logo />
      </div>
    </div>
  )
}

export default Loading
