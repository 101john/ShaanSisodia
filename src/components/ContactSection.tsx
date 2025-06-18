import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Terminal, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  
  const fullText = 'send_message("hey, let\'s build something.")';

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 60);

    // Cursor blink
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const handleSendMessage = () => {
    setMessageStatus('sending');
    setTimeout(() => {
      setMessageStatus('sent');
      setTimeout(() => setMessageStatus('idle'), 3000);
    }, 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/101shaan',
      handle: '@101shaan',
      description: 'Code repositories & projects',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/shaan-sisodia-2810962ab/?trk=people-guest_people_search-card&originalSubdomain=uk',
      handle: '/in/shaan-sisodia',
      description: 'Professional network',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:shaansisodia3@gmail.com',
      handle: 'shaansisodia3@gmail.com',
      description: 'Direct communication',
    },
  ];

  return (
    <section className="py-32 px-8 bg-gradient-to-b from-transparent to-black/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/3 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,173,181,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,173,181,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's <span className="text-accent-primary">Connect</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to build something extraordinary together?
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto mt-8"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h3 
                className="text-2xl font-bold mb-6 text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Get in Touch
              </motion.h3>
              <motion.p 
                className="text-text-secondary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Whether you have a project in mind, want to collaborate, 
                or just want to say hello, I'd love to hear from you.
              </motion.p>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ 
                      x: 10, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-center gap-5 p-6 bg-dark-surface/60 backdrop-blur-sm border border-dark-border rounded-2xl hover:border-accent-primary/40 hover:bg-dark-surface/80 transition-all duration-400 group magnetic relative overflow-hidden"
                  >
                    {/* Background glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.4 }}
                    />
                    
                    <div className="w-14 h-14 bg-accent-primary/10 rounded-xl flex items-center justify-center group-hover:bg-accent-primary/20 group-hover:scale-110 transition-all duration-300 relative z-10">
                      <IconComponent className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div className="relative z-10">
                      <div className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                        {link.name}
                      </div>
                      <div className="text-sm text-text-secondary mb-1">{link.handle}</div>
                      <div className="text-xs text-text-muted">{link.description}</div>
                    </div>
                    
                    {/* Hover line effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-3xl overflow-hidden hover:border-accent-primary/30 transition-all duration-500 relative">
              {/* Terminal Header */}
              <div className="flex items-center gap-3 px-8 py-6 bg-dark-bg/50 border-b border-dark-border relative">
                <div className="flex gap-3">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-red-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-yellow-500"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-green-500"
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <Terminal className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary font-mono">shaan@portfolio:~</span>
                </div>
                
                {/* Status indicator */}
                <div className="ml-auto flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-accent-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-text-muted font-mono">ONLINE</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono relative">
                <div className="mb-6">
                  <span className="text-accent-primary">shaan@portfolio</span>
                  <span className="text-text-secondary">:</span>
                  <span className="text-blue-400"></span>
                  <span className="text-text-secondary"> </span>
                </div>
                
                <div className="mb-8 relative">
                  <span className="text-accent-primary"> </span>
                  <span className="text-text-primary">
                    {terminalText}
                    {(showCursor || isTyping) && (
                      <motion.span 
                        className="text-accent-primary"
                        animate={{ opacity: showCursor ? [1, 0] : 1 }}
                        transition={{ duration: 0.8, repeat: showCursor ? Infinity : 0 }}
                      >
                        
                      </motion.span>
                    )}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: terminalText === fullText ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-3 text-text-secondary mb-8"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="text-green-400">✓</span> Message initialized
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-blue-400">→</span> Connecting to shaansisodia3@gmail.com...
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                    className="text-green-400"
                  >
                    ✓ Connection established
                  </motion.div>
                </motion.div>

                {/* Send Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: terminalText === fullText ? 1 : 0, y: terminalText === fullText ? 0 : 20 }}
                  transition={{ delay: 1.6 }}
                  onClick={handleSendMessage}
                  disabled={messageStatus === 'sending'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent-primary/10 border border-accent-primary/30 rounded-xl text-accent-primary font-medium hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed magnetic relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {messageStatus === 'idle' && 'Execute'}
                    {messageStatus === 'sending' && 'Sending...'}
                    {messageStatus === 'sent' && 'Sent!'}
                  </span>
                  <motion.div
                    animate={{ 
                      rotate: messageStatus === 'sending' ? 360 : 0,
                      scale: messageStatus === 'sent' ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      rotate: { duration: 1, repeat: messageStatus === 'sending' ? Infinity : 0 },
                      scale: { duration: 0.3 }
                    }}
                    className="relative z-10"
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                  
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Status messages */}
                <AnimatePresence>
                  {messageStatus === 'sent' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-green-400 font-mono text-sm"
                    >
                      <span className="text-green-400">✓</span> Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-dark-border text-center relative"
        >
          <motion.p 
            className="text-text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            © 2025 Shaan Sisodia. Crafted with precision and passion.
          </motion.p>
          
          {/* Animated signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-accent-primary font-mono text-sm"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              // Building the future, one line at a time
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;