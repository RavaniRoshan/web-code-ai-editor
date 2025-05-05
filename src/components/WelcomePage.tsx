
import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-light mb-4 text-gradient">Visual Studio Code</h1>
        <h2 className="text-xl font-light mb-8 text-gray-400">Editing evolved</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col">
            <h3 className="text-xl mb-4">Start</h3>
            <div className="flex flex-col gap-4">
              <button className="text-left flex items-center text-blue-500 hover:text-blue-400">
                <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor" />
                  <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor" />
                </svg>
                New File...
              </button>
              <button className="text-left flex items-center text-blue-500 hover:text-blue-400">
                <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4H10L12 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Open File...
              </button>
              <button className="text-left flex items-center text-blue-500 hover:text-blue-400">
                <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4H10L12 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Open Folder...
              </button>
              <button className="text-left flex items-center text-blue-500 hover:text-blue-400">
                <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H3V19H21V9M15 3L21 9M15 3V9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Clone Git Repository...
              </button>
              <button className="text-left flex items-center text-blue-500 hover:text-blue-400">
                <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Connect to...
              </button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-xl mb-4">Recent</h3>
            <div className="flex flex-col gap-2">
              <div className="text-blue-500 hover:text-blue-400 cursor-pointer">New projects</div>
              <div className="text-blue-500 hover:text-blue-400 cursor-pointer">My Project</div>
              <div className="text-blue-500 hover:text-blue-400 cursor-pointer">React App</div>
              <div className="text-blue-500 hover:text-blue-400 cursor-pointer">Vue Dashboard</div>
              <div className="text-blue-500 hover:text-blue-400 cursor-pointer">TypeScript Demo</div>
            </div>
            
            <h3 className="text-xl mt-8 mb-4">Walkthroughs</h3>
            <div className="flex flex-col gap-4">
              <div className="p-4 border border-gray-700 rounded hover:border-gray-600 cursor-pointer bg-editor-active/30">
                <div className="flex items-center">
                  <div className="mr-3 text-blue-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium">Get Started with VS Code</div>
                    <div className="text-sm text-gray-400">Customize your editor, learn the basics, and start coding</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-700 rounded hover:border-gray-600 cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-3 text-blue-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium">Learn the Fundamentals</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-700 rounded hover:border-gray-600 cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-3 text-blue-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium">Browse & Edit Remote Resources</div>
                    <span className="text-xs bg-blue-700 px-2 rounded">Updated</span>
                  </div>
                </div>
              </div>
              
              <button className="text-left text-blue-500 hover:text-blue-400">More...</button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 flex items-center">
          <input type="checkbox" id="showWelcome" className="mr-2" defaultChecked />
          <label htmlFor="showWelcome">Show welcome page on startup</label>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
