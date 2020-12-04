import React from 'react';

import { I18nProvider } from './I18nContext';

const AppProviders = ({ children }) => (
    <I18nProvider>
      {children}
    </I18nProvider>
  );
  
  export default AppProviders;