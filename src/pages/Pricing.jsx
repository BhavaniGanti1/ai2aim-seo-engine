import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CheckCircle, X, HelpCircle, Zap, ArrowRight, Sparkles
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and startups',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      { name: 'Up to 5 campaigns', included: true },
      { name: '10,000 contacts', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'AI content generation (100/mo)', included: true },
      { name: 'A/B testing', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated account manager', included: false },
      { name: 'Custom AI models', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    description: 'For growing teams that need more power',
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: [
      { name: 'Unlimited campaigns', included: true },
      { name: '100,000 contacts', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'AI content generation (1,000/mo)', included: true },
      { name: 'A/B testing', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Dedicated account manager', included: false },
      { name: 'Custom AI models', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with complex needs',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      { name: 'Unlimited campaigns', included: true },
      { name: 'Unlimited contacts', included: true },
      { name: 'Advanced analytics', included: true },
      { name: '24/7 phone support', included: true },
      { name: 'Unlimited AI content', included: true },
      { name: 'A/B testing', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom AI models', included: true },
    ],
    cta: 'Contact Sales',
    popular: false
  },
]

const faqs = [
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll have immediate access to new features. When you downgrade, changes will take effect at the start of your next billing cycle.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for Enterprise customers, we also offer invoicing and bank transfers.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start. You\'ll have full access to all features during your trial period.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'If you cancel, you\'ll have 30 days to export your data. After that, your data will be securely deleted from our servers in compliance with GDPR.'
  },
]

function Pricing() {
  const [isYearly, setIsYearly] = useState(true)

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-lime/10 border border-neon-lime/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-neon-lime" />
              <span className="text-neon-lime text-sm font-medium">Save 20% with yearly billing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 bg-slate-dark/50 rounded-xl">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !isYearly ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isYearly ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-8 ${
                  plan.popular ? 'border-neon-cyan/50 scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full text-void text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-display font-bold text-white">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      {isYearly && (
                        <p className="text-neon-lime text-sm mt-2">
                          Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-display font-bold gradient-text">Custom</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-neon-lime flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.monthlyPrice ? '/signup' : '/contact'}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-void hover:shadow-neon-cyan'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Compare All Features
            </h2>
            <p className="text-gray-400">
              See which plan is right for you
            </p>
          </motion.div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-dark">
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-medium">Starter</th>
                    <th className="text-center py-4 px-6 text-neon-cyan font-medium">Professional</th>
                    <th className="text-center py-4 px-6 text-gray-400 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Campaigns', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Contacts', starter: '10K', pro: '100K', enterprise: 'Unlimited' },
                    { feature: 'AI Content/mo', starter: '100', pro: '1,000', enterprise: 'Unlimited' },
                    { feature: 'Team members', starter: '2', pro: '10', enterprise: 'Unlimited' },
                    { feature: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                    { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7 Phone' },
                    { feature: 'API Access', starter: false, pro: true, enterprise: true },
                    { feature: 'Custom Branding', starter: false, pro: true, enterprise: true },
                    { feature: 'SSO', starter: false, pro: false, enterprise: true },
                    { feature: 'SLA', starter: false, pro: false, enterprise: true },
                  ].map((row, index) => (
                    <tr key={row.feature} className="border-b border-slate-dark/50">
                      <td className="py-4 px-6 text-white">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <CheckCircle className="w-5 h-5 text-neon-lime mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-400">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center bg-neon-cyan/5">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <CheckCircle className="w-5 h-5 text-neon-lime mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-neon-cyan font-medium">{row.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <CheckCircle className="w-5 h-5 text-neon-lime mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-400">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-obsidian/50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 ml-8">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Start Your Free Trial Today
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              No credit card required. Full access to all features for 14 days.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl text-void font-bold text-xl hover:shadow-neon-cyan transition-all"
              >
                Get Started Free
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing

