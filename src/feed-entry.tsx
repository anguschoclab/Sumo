import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalEventFeed from './components/GlobalEventFeed';

const id = 'global-feed-root';
let el = document.getElementById(id);
if (!el) {
  el = document.createElement('div');
  el.id = id;
  document.body.appendChild(el);
}
const root = ReactDOM.createRoot(el);
root.render(<GlobalEventFeed defaultOpen={true} />);
