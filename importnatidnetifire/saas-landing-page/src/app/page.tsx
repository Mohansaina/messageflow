"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message });
        setEmail(""); // Clear the form
        setTimeout(() => setSubmitMessage(null), 5000); // Clear message after 5 seconds
      } else {
        setSubmitMessage({ type: 'error', text: data.message || data.error });
        setTimeout(() => setSubmitMessage(null), 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      setTimeout(() => setSubmitMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const slideInFromLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };
  
  const slideInFromRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-bold text-gray-900"
          >
            MessageFlow
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign In
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
            className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full blur-3xl"
          ></motion.div>
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative z-10 max-w-3xl mx-auto space-y-8"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1 rounded-full mb-4"
          >
            Finally, a solution to message overload
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
          >
            Never miss important updates in your startup
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Get a daily summary of what actually matters from Slack, WhatsApp, and email.
          </motion.p>
          
          <motion.form 
            variants={fadeInUp}
            onSubmit={handleSubmit} 
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 rounded-xl border border-gray-300 px-5 py-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gray-900 px-7 py-4 text-white font-medium hover:bg-black transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Get Early Access'
              )}
            </motion.button>
          </motion.form>
          
          {submitMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 px-4 py-3 rounded-lg text-center ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {submitMessage.text}
            </motion.div>
          )}
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 text-sm text-gray-500 flex justify-center items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free trial</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4"
            >
              The problem with modern communication
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              As a founder, you're constantly bombarded with messages across multiple platforms. Important updates get lost in the noise.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Slack messages</h3>
              <p className="text-gray-600">Endless channels and notifications drowning important updates</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">WhatsApp chats</h3>
              <p className="text-gray-600">Client conversations scattered everywhere</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Emails</h3>
              <p className="text-gray-600">Inbox overflowing with unimportant updates</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center max-w-2xl mx-auto"
          >
            <div className="text-2xl md:text-3xl font-medium text-gray-900 italic">
              "Important updates get lost in the noise."
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-5xl">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4"
            >
              Our solution
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              We filter and show only what matters.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-xl -z-10"></div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg max-w-md w-full mx-auto"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-auto text-sm text-gray-500">messageflow.app</div>
                </div>
                
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 13.047 14.01c-.04.3-.068.59-.068.79a2 2 0 002 2 2 2 0 002-2c0-.2-.028-.49-.068-.79L15.854 7.2l1.179-4.456A1 1 0 0118 2a1 1 0 011 1 1 1 0 01-1 1h-1.5a.5.5 0 000 1H19a1 1 0 011 1v1a1 1 0 01-1 1h-1.5a.5.5 0 000 1H19a1 1 0 011 1v1a1 1 0 01-1 1h-1.5a.5.5 0 000 1H16a1 1 0 01-1-1v-1a1 1 0 011-1h1.5a.5.5 0 000-1H16a1 1 0 01-1-1v-1a1 1 0 011-1h1.5a.5.5 0 000-1H16a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Today's Important Updates
                </h3>
                <ul className="space-y-4">
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start group"
                  >
                    <span className="mr-3 mt-1 text-blue-500 group-hover:text-blue-600 transition-colors">•</span>
                    <div>
                      <span className="text-gray-700 font-medium">Client asking for urgent response</span>
                      <div className="text-sm text-gray-500 mt-1">from Sarah at Acme Inc - 9:23 AM</div>
                    </div>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start group"
                  >
                    <span className="mr-3 mt-1 text-blue-500 group-hover:text-blue-600 transition-colors">•</span>
                    <div>
                      <span className="text-gray-700 font-medium">Bug reported by dev team</span>
                      <div className="text-sm text-gray-500 mt-1">in Payment Module - 10:45 AM</div>
                    </div>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start group"
                  >
                    <span className="mr-3 mt-1 text-blue-500 group-hover:text-blue-600 transition-colors">•</span>
                    <div>
                      <span className="text-gray-700 font-medium">Co-founder needs decision</span>
                      <div className="text-sm text-gray-500 mt-1">on marketing campaign - 11:30 AM</div>
                    </div>
                  </motion.li>
                </ul>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center"
                >
                  <div className="text-sm text-gray-500">3 of 12 updates shown</div>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    View all <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8"
          >
            Built for ambitious builders
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-gray-200 transition-all duration-300 bg-white hover:shadow-lg"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Startup Founders</h3>
              <p className="text-gray-600">Focus on growth without getting overwhelmed by communication</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-gray-200 transition-all duration-300 bg-white hover:shadow-lg"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Indie Hackers</h3>
              <p className="text-gray-600">Stay on top of customer feedback and critical issues</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-gray-200 transition-all duration-300 bg-white hover:shadow-lg"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Small Remote Teams</h3>
              <p className="text-gray-600">Coordinate effectively without losing important context</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Get early access today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto"
          >
            Join our waitlist and be among the first to experience simplified communication.
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-10"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 rounded-xl border-0 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-white text-gray-900 px-7 py-4 font-medium hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Get Early Access'
              )}
            </motion.button>
          </motion.form>
          
          {submitMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 px-4 py-3 rounded-lg text-center ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {submitMessage.text}
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            Join 2,847+ founders who trust us to streamline their communication
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            © {new Date().getFullYear()} MessageFlow. All rights reserved.
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-6"
          >
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
