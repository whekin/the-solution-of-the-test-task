import React from 'react';
import { LanguageContext } from '../logic/language-context';

const CannotBeLoaded = () => (
  <LanguageContext.Consumer>
    {language => (
      <div className="cannotBeLoaded">
        <div className="cannotBeLoaded__text">
          {language.cannotBeLoaded_text}
        </div>
      </div>
    )}
  </LanguageContext.Consumer>
);

export default CannotBeLoaded;
