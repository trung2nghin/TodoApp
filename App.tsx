import React, {FC} from 'react';
import {Provider} from 'react-redux';

import AppNavigation from './src/navigation';
import {store} from './src/redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
