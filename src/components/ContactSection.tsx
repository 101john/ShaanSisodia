import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Terminal, Send, X } from 'lucide-react';

const ContactSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState<Array<{type: 'command' | 'output' | 'error', text: string}>>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [fullText] = useState('send_message("hey, let\'s build something.")');

  // Initialize terminal when section comes into view
  useEffect(() => {
    if (isInView) {
      setTerminalOutput([
        { type: 'output', text: 'Terminal initialized. Type "help" for available commands.' }
      ]);
    }
  }, [isInView]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 800);

    return () => clearInterval(cursorTimer);
  }, []);

  // Terminal command handling
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    setTerminalHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Add command to output
    setTerminalOutput(prev => [...prev, { type: 'command', text: `$ ${cmd}` }]);
    
    switch (command) {
      case 'help':
        setTerminalOutput(prev => [...prev, 
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '- contact    → scroll to contact form' },
          { type: 'output', text: '- projects   → navigate to projects' },
          { type: 'output', text: '- about      → show identity statement' },
          { type: 'output', text: '- tech       → view tech arsenal' },
          { type: 'output', text: '- ls         → list directory contents' },
          { type: 'output', text: '- clear      → clear terminal' },
          { type: 'output', text: '- sudo       → try elevated access' },
          { type: 'output', text: '- cat        → read files' }
        ]);
        break;
        
      case 'contact':
        setTerminalOutput(prev => [...prev, { type: 'output', text: 'Scrolling to contact section...' }]);
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
        
      case 'projects':
        setTerminalOutput(prev => [...prev, { type: 'output', text: 'Navigating to projects...' }]);
        setTimeout(() => {
          document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
        
      case 'about':
        setTerminalOutput(prev => [...prev, 
          { type: 'output', text: 'IDENTITY_STATEMENT:' },
          { type: 'output', text: '"I build systems, not screens."' },
          { type: 'output', text: '"Every interface should breathe."' },
          { type: 'output', text: '"Function without soul is noise."' }
        ]);
        break;
        
      case 'tech':
        setTerminalOutput(prev => [...prev, { type: 'output', text: 'Navigating to tech arsenal...' }]);
        setTimeout(() => {
          document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
        
      case 'ls':
        setTerminalOutput(prev => [...prev,
          { type: 'output', text: '/home/shaan/' },
          { type: 'output', text: '  ├── projects/' },
          { type: 'output', text: '  ├── thoughts.md' },
          { type: 'output', text: '  ├── obsessions.txt' },
          { type: 'output', text: '  └── secrets.sh' }
        ]);
        break;
        
      case 'sudo':
        setTerminalOutput(prev => [...prev, { type: 'error', text: 'permission denied: you\'re not root here' }]);
        break;
        
      case 'cat secrets.sh':
        setTerminalOutput(prev => [...prev,
          { type: 'output', text: '#!/bin/bash' },
          { type: 'output', text: 'echo "there are no secrets, only deeper layers."' }
        ]);
        break;
        
      case 'cat thoughts.md':
        setTerminalOutput(prev => [...prev,
          { type: 'output', text: '# Random Thoughts' },
          { type: 'output', text: '- Code is poetry in motion' },
          { type: 'output', text: '- Every pixel has purpose' },
          { type: 'output', text: '- Minimalism is the ultimate sophistication' }
        ]);
        break;
        
      case 'cat obsessions.txt':
        setTerminalOutput(prev => [...prev,
          { type: 'output', text: 'Current obsessions:' },
          { type: 'output', text: '→ WebGL shaders' },
          { type: 'output', text: '→ Micro-interactions' },
          { type: 'output', text: '→ System architecture' },
          { type: 'output', text: '→ Perfect typography' }
        ]);
        break;
        
      case 'clear':
        setTerminalOutput([]);
        break;
        
      default:
        setTerminalOutput(prev => [...prev, { type: 'error', text: `command not found: ${cmd}. Type "help" for available commands.` }]);
    }
    
    setCurrentCommand('');
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length > 0) {
        const newIndex = historyIndex === -1 ? terminalHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(terminalHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= terminalHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(terminalHistory[newIndex]);
        }
      }
    } else if (e.key === 'Escape') {
      setShowTerminalModal(false);
    }
  };

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowTerminalModal(true);
      } else if (e.key === '/') {
        e.preventDefault();
        setShowTerminalModal(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSendMessage = () => {
    setMessageStatus('sending');
    setTimeout(() => {
      setMessageStatus('sent');
      setTimeout(() => setMessageStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 p-8">
      <div className="w-full md:w-1/2 space-y-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Let's <span className="text-accent">Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-text-secondary"
        >
          Ready to build something extraordinary together?
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col space-y-4"
        >
          <a href="https://github.com/1010shaan" target="_blank" rel="noopener noreferrer" 
             className="group flex items-start space-x-4 p-4 bg-[#111111] hover:bg-[#161616] rounded-lg transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/20">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] group-hover:bg-[#202020] flex items-center justify-center transition-colors">
              <Github className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">GitHub</h3>
              <p className="text-sm text-gray-500">@101shaan</p>
              <p className="text-xs text-gray-600 mt-1">Code repositories & projects</p>
            </div>
          </a>

          <a href="https://linkedin.com/in/shaan-sisodia" target="_blank" rel="noopener noreferrer"
             className="group flex items-start space-x-4 p-4 bg-[#111111] hover:bg-[#161616] rounded-lg transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/20">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] group-hover:bg-[#202020] flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">LinkedIn</h3>
              <p className="text-sm text-gray-500">/in/shaan-sisodia</p>
              <p className="text-xs text-gray-600 mt-1">Professional network</p>
            </div>
          </a>

          <a href="mailto:shaansisodia3@gmail.com"
             className="group flex items-start space-x-4 p-4 bg-[#111111] hover:bg-[#161616] rounded-lg transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/20">
            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] group-hover:bg-[#202020] flex items-center justify-center transition-colors">
              <Mail className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">Email</h3>
              <p className="text-sm text-gray-500">shaansisodia3@gmail.com</p>
              <p className="text-xs text-gray-600 mt-1">Direct communication</p>
            </div>
          </a>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111111] rounded-xl overflow-hidden shadow-2xl border border-gray-800/50"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-gray-800/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-400">shaan@portfolio:~</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-cyan-500">• ONLINE</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm">
            <div className="text-cyan-500 mb-2">shaan@portfolio:~$</div>
            
            <div className="h-[400px] overflow-y-auto space-y-2 terminal-content">
              {terminalOutput.map((line, index) => (
                <div key={index} className={`${
                  line.type === 'error' ? 'text-red-400' : 
                  line.type === 'command' ? 'text-cyan-500' : 'text-gray-300'
                } font-mono`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center group">
                <span className="text-cyan-500">$ </span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleTerminalKeyDown}
                  className="flex-1 bg-transparent border-none outline-none ml-2 text-gray-300 font-mono"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Terminal Modal */}
      <AnimatePresence>
        {showTerminalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-bg/95 backdrop-blur-2xl z-[9999] flex items-center justify-center p-8"
            onClick={() => setShowTerminalModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-4xl w-full bg-dark-surface/95 backdrop-blur-sm border border-accent-primary/20 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-dark-bg/80 border-b border-dark-border">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent-primary" />
                    <span className="text-sm font-mono text-text-secondary">Terminal</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTerminalModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-dark-surface/50 transition-colors"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm max-h-96 overflow-y-auto">
                {/* Terminal Output */}
                <div className="space-y-1 mb-4">
                  {terminalOutput.map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        line.type === 'command' 
                          ? 'text-accent-primary' 
                          : line.type === 'error' 
                          ? 'text-red-400' 
                          : 'text-text-secondary'
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                </div>

                {/* Command Input */}
                <div className="flex items-center gap-2">
                  <span className="text-accent-primary"></span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-accent-primary"
                  >
                    |
                  </motion.span>
                </div>

                {/* Help hint */}
                <div className="mt-4 text-xs text-text-muted">
                  Press <kbd className="px-1 py-0.5 bg-dark-surface rounded text-accent-primary">↑</kbd> / <kbd className="px-1 py-0.5 bg-dark-surface rounded text-accent-primary">↓</kbd> for history, <kbd className="px-1 py-0.5 bg-dark-surface rounded text-accent-primary">Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;