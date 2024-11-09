import React, {createContext, useState, useContext} from 'react';

const StoryContext = createContext();

export function useStory() {
  return useContext(StoryContext);
}

export function StoryProvider({children}) {
  const [story, setStory] = useState('');

  return (
    <StoryContext.Provider value={{story, setStory}}>
      {children}
    </StoryContext.Provider>
  );
}
