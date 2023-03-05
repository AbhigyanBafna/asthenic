import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import "regenerator-runtime/runtime";

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <App />
    </Router>
);
