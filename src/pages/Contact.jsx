import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe,
  CheckCircle, Loader2, ChevronDown
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Our team typically responds within 2 hours',
    value: 'hello@ai2aim.com',
    color: 'cyan'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 8am to 6pm EST',
    value: '+1 (555) 123-4567',
    color: 'magenta'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our HQ',
    value: '123 Innovation Drive, San Francisco, CA',
    color: 'lime'
  },
]

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with a 14-day free trial with full access to all features. No credit card required. At the end of your trial, choose a plan that fits your needs.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing.'
  },
  {
    question: 'What integrations do you support?',
    answer: 'We integrate with 100+ marketing tools including Google Ads, Facebook, HubSpot, Salesforce, Mailchimp, and many more.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We use bank-level encryption, are SOC 2 Type II certified, and are fully GDPR compliant. Your data is always safe with us.'
  },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-400">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const colorClasses = {
                cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
                magenta: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/30',
                lime: 'bg-neon-lime/10 text-neon-lime border-neon-lime/30',
              }
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className={`inline-flex p-4 rounded-2xl ${colorClasses[method.color]} mb-4`}>
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{method.description}</p>
                  <p className="text-gray-300 font-medium">{method.value}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-lime/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-neon-lime" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: '', email: '', company: '', subject: '', message: '' })
                    }}
                    className="text-neon-cyan hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Work Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white focus:outline-none focus:border-neon-cyan/50 transition-all"
                        required
                      >
                        <option value="">Select a topic</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-all resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl text-void font-bold flex items-center justify-center gap-2 hover:shadow-neon-cyan transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between"
                    >
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedFaq === index ? 'auto' : 0,
                        opacity: expandedFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Help */}
              <div className="mt-8 glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-plasma-purple/20">
                    <MessageSquare className="w-6 h-6 text-plasma-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Need more help?</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Check out our comprehensive documentation and tutorials.
                    </p>
                    <a href="#" className="text-neon-cyan hover:underline font-medium text-sm">
                      Visit Help Center →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

