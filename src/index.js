import React from 'react';
import ReactDOM from 'react-dom/client';
import IserToolkit from './IserToolkit.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(IserToolkit.default || IserToolkit));
