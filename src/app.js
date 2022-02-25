import React from 'react';

// import 'normalize.css';

import Context from './context/settings/context.js';
import ToDo from './components/todo/todo.js';

export default function App() {
    return (
      <>
        <Context>
          <ToDo />
        </Context>
      </>
    );
}
