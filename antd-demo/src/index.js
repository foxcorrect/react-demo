import dva from 'dva';
import { createBrowserHistory, createHashHistory } from 'history';
import router from './router';
import login from './model/login';
import './css/common.css'
// import layout from './model/layout';

let history = createBrowserHistory();

// 1. Initialize
const app = dva({
    history
});

// 2. Plugins
app.use({});

// 3. Model
app.model(login);
// app.model(layout);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
