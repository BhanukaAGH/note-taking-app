import ContentArea from '@/components/layout/ContentArea'
import Sidebar from '@/components/layout/Sidebar'

const Home = () => {
  return (
    <main className='h-screen flex'>
      <Sidebar />
      <ContentArea />
    </main>
  )
}

export default Home
