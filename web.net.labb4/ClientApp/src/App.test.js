import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <App />

        </BrowserRouter>, div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});