import React from 'react';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/Preloader.css';

const Loading = () => (
  <LanguageContext.Consumer>
    {language => (
      <div className="Preloader">
        <div className="Preloader__main"></div>
        <div className="Preloader__text">
          {language.loading_text}
        </div>
      </div>
    )}
  </LanguageContext.Consumer>
);

export default Loading;
