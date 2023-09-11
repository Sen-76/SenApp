import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/_reset.scss';
import './assets/scss/_overrideAntCss.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
