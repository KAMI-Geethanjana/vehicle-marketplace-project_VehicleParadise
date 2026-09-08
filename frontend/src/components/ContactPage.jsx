import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (Wireframe 12) */}
      <div className="space-y-1">
        <h1 className="font-outfit font-black text-3xl text-slate-900 dark:text-white">
          Contact Vehicle Paradise
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          We are here to help
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Send us a message form (Wireframe 12) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            Send us a message
          </h2>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Message Sent!</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Thank you for contacting Vehicle Paradise. Our team will respond to your email within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Your name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-dark-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="py-3.5 px-8 bg-slate-800 dark:bg-dark-700 hover:bg-slate-900 text-white font-outfit font-bold rounded-xl text-xs shadow-sm transition-all"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Contact Information Card (Wireframe 12) */}
        <div className="lg:col-span-5 bg-slate-100 dark:bg-dark-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="font-outfit font-bold text-xl text-slate-900 dark:text-white">
            Contact information
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Customer support</span>
              <strong className="text-slate-900 dark:text-white text-sm">support@vehicleparadise.lk</strong>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Phone</span>
              <strong className="text-slate-900 dark:text-white text-sm">+94 11 234 5678</strong>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block font-medium">Office</span>
              <strong className="text-slate-900 dark:text-white text-sm">Colombo, Sri Lanka</strong>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 italic">Response time: within 1 business day</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
