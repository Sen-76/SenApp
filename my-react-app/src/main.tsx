import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/_reset.scss';
import './assets/scss/_overrideAntCss.scss';
import './assets/scss/_common.scss';
import './assets/scss/_mixin.scss';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
