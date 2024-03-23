import React, { useState } from 'react';
import {marked} from 'marked';
import './App.css';

// ErrorBoundary component to catch errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Catch errors
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log errors
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>; // Fallback UI
    }
    return this.props.children; // Render children components as usual
  }
}

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="App">
      <div className="font-bold text-center text-red-400 text-4xl">
        Markdown Previewer
      </div>
      <div className="flex justify-center">
        <div className="row mt-4">
          <div className="col-md-6 w-[600px]">
            <h2>Input Markdown</h2>
            <div className="mark-input w-[500px] h-[50vh]">
              <textarea 
                className="input w-[500px] h-[50vh] border-[2px] border-solid
                  border-gray-500 outline-none rounded-md bg-[#DCDCDC] ml-auto mr-auto p-2"
                value={markdown}
                onChange={handleMarkdownChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6 w-[600px]">
            <h2>Output</h2>
            <ErrorBoundary> {/* Wrap the component tree with ErrorBoundary */}
              <div
                className="mark-output block"
                dangerouslySetInnerHTML={{ __html: marked(markdown) }}
              ></div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
