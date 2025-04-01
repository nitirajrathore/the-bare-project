import "../../global.css"; // Import Tailwind styles


const dogSrc: string = 'https://media.tenor.com/fej4_qoxdHYAAAAM/cute-puppy.gif';

const generateDogGif = async () => {
  // Get the active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  // Send the dog Gif
  chrome.tabs.sendMessage(activeTab.id || 0, dogSrc);
};

const App = () => {
  return (
    <main className="min-w-[300px] min-h-[400px] p-4 bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Add a Dog Gif to Webpage</h1>
        <img
          src={dogSrc}
          className="w-48 h-48 rounded-lg shadow-lg object-cover"
          alt="Cute dog gif"
        />
        <button
          onClick={generateDogGif}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-md"
        >
          Generate Dog Gif
        </button>
      </div>
    </main>
  );
};
export default App;