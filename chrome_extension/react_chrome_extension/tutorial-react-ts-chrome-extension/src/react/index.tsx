import { createRoot } from 'react-dom/client';
import App from './components/App';
import "../global.css"; // Import Tailwind styles

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);