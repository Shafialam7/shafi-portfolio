// server/aiAssistant.js

/**
 * Intelligent AI Response Generator for Shafi's Portfolio Chatbot
 * Analyzes user queries and returns detailed contextual AI responses.
 */
function generateAIResponse(query) {
  if (!query || typeof query !== 'string') {
    return "Hello! I am Shafi's AI Assistant. How can I assist you with software development or hiring today?";
  }

  const q = query.toLowerCase().trim();

  // 1. Pricing & Budget Estimates
  if (q.includes('cost') || q.includes('price') || q.includes('pricing') || q.includes('rate') || q.includes('fee') || q.includes('budget') || q.includes('charge')) {
    return "💰 Project Pricing & Budget Estimates:\n• Custom Web Applications: Flexible pricing based on project scope & features.\n• Full-Stack Solutions & APIs: Competitive fixed milestone or hourly rates.\n• Landing Pages & Portfolios: Fast turnaround packages.\n\n✉️ For an exact quote, contact Shafi at devbyshafi@gmail.com or WhatsApp +91 79957 81051!";
  }

  // 2. Timeline & Delivery Speed
  if (q.includes('timeline') || q.includes('time') || q.includes('how long') || q.includes('deadline') || q.includes('fast') || q.includes('urgent') || q.includes('duration')) {
    return "⏱️ Development Timelines:\n• Landing Pages & Portfolios: 3 – 7 days\n• Full-Stack Web Applications: 2 – 3 weeks\n• Enterprise Platforms & Custom Engines: 3 – 6 weeks\n\n⚡ Shafi ensures fast, clean code delivery with regular progress updates!";
  }

  // 3. Hiring & Contact Information
  if (q.includes('hire') || q.includes('available') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('freelance') || q.includes('job') || q.includes('work')) {
    return "🟢 Shafi is AVAILABLE for full-time engineering roles, contracting, and freelance software projects!\n\n📧 Email: devbyshafi@gmail.com\n📱 Phone / WhatsApp: +91 79957 81051\n🌐 Portfolio: Full-Stack Web & Mobile Developer";
  }

  // 4. Skills & Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('python') || q.includes('tech') || q.includes('database') || q.includes('api')) {
    return "🛠️ Tech Stack & Expertise:\n• Frontend: React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS\n• Backend: Node.js, Express.js, REST APIs, GraphQL\n• Databases: PostgreSQL, SQLite, MongoDB\n• Mobile: React Native, Expo\n• Tools & DevOps: Git, Docker, Vite, Vercel";
  }

  // 5. Featured Projects (Veronn Tourism & Axis Visa)
  if (q.includes('project') || q.includes('portfolio') || q.includes('veronn') || q.includes('axis') || q.includes('visa') || q.includes('travel')) {
    return "🚀 Featured Work:\n1. Veronn Tourism — High-performance travel booking platform with real-time flight REST APIs.\n2. Axis Visa Services — Visa tracking portal with automated document verification workflows.\n3. Chatbot Command Center — Real-time multi-client live chat messaging backend.";
  }

  // 6. Greetings
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('good morning') || q.includes('good evening')) {
    return "Hello! 👋 Welcome to Shafi's portfolio. I'm his AI assistant. How can I help you today? Ask me about pricing, timelines, tech stack, or hiring Shafi!";
  }

  // Default AI Fallback Response
  return `Thank you for your message! 🤖 I have saved your query and notified Shafi directly. 

Shafi specializes in Full-Stack Web & Mobile Development. If you'd like to get in touch immediately, email devbyshafi@gmail.com or WhatsApp +91 79957 81051!`;
}

module.exports = { generateAIResponse };
