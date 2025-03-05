import Link from 'next/link'

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Chat App</h1>
        <p className="text-xl">Connect and communicate with ease</p>
      </header>
      <main className="flex flex-col items-center">
        <Link href="/basic-chat" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300">
          Get Started with Basic Chat
        </Link>
        <br />
        <Link href="/simple-chat" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300">
          Get Started with Simple Chat
        </Link>
        <br />
        <Link href="/custom-chat" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300">
          Get Started with Custom Chat
        </Link>
      </main>
      <footer className="absolute bottom-4 text-center">
        <p className="text-sm">&copy; 2025 Chat App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default WelcomePage