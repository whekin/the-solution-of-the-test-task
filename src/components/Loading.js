import React from 'react';
import { LanguageContext } from '../logic/language-context';

const Loading = () => (
  <LanguageContext.Consumer>
    {language => (
      <div className="loading">
        <div className="loading__preload"></div>
        <div className="loading__text">
          {language.loading_text}
        </div>
      </div>
    )}
  </LanguageContext.Consumer>
);

export default Loading;
