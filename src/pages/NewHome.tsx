import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Video,
  FileText,
  BarChart3,
  Users,
  Zap,
  Star,
  Play,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
  Rocket,
  Target,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Lock,
  Key,
  Database,
  Cloud,
  Server,
  Cpu,
  Wifi,
  Battery,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RefreshCw,
  Save,
  Edit,
  Trash,
  Copy,
  Cut,
  Paste,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Grid,
  Image,
  Link as LinkIcon,
  Code,
  Quote,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Plus,
  Minus,
  Divide,
  Equal,
  Infinity,
  Pi,
  Sigma,
  Omega,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Theta,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { PricingCard, PricingPlan } from "../components/ui/pricing-card";
import { FeatureCard, Feature } from "../components/ui/feature-card";

export default function NewHome() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hero Stats with enhanced data
  const heroStats = [
    {
      label: "Projects Completed",
      value: "10,000+",
      change: "+25%",
      icon: <Target className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Active Users",
      value: "50,000+",
      change: "+40%",
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Videos Created",
      value: "100,000+",
      change: "+60%",
      icon: <Video className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Satisfaction Rate",
      value: "99.8%",
      change: "+5%",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-600",
    },
  ];

  // Enhanced Features
  const features: Feature[] = [
    {
      id: "ai-video",
      title: "AI Video Generator",
      description:
        "Create professional videos from scripts with advanced AI technology. Support multiple languages and styles.",
      icon: <Video className="w-8 h-8" />,
      color: "blue",
      badge: "Hot",
      stats: [
        { label: "Generation Time", value: "<5 min" },
        { label: "Quality", value: "4K" },
        { label: "Languages", value: "50+" },
      ],
      demo: "https://example.com/video-demo",
      features: [
        "Auto-sync",
        "Voice cloning",
        "Background removal",
        "Motion tracking",
      ],
    },
    {
      id: "script-ai",
      title: "Script AI Assistant",
      description:
        "Intelligent AI assistant helps create creative scripts suitable for any purpose and audience.",
      icon: <FileText className="w-8 h-8" />,
      color: "purple",
      badge: "New",
      stats: [
        { label: "Languages", value: "20+" },
        { label: "Templates", value: "100+" },
        { label: "Genres", value: "15+" },
      ],
      demo: "https://example.com/script-demo",
      features: [
        "Smart suggestions",
        "Grammar check",
        "Tone adjustment",
        "SEO optimization",
      ],
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      description:
        "Detailed content performance analysis with visual dashboard and automatic reporting.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "green",
      stats: [
        { label: "Metrics", value: "50+" },
        { label: "Real-time", value: "100%" },
        { label: "Reports", value: "Auto" },
      ],
      demo: "https://example.com/analytics-demo",
      features: [
        "Real-time tracking",
        "Custom dashboards",
        "Export reports",
        "Predictive insights",
      ],
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      description:
        "Efficient teamwork with project management system and detailed permissions.",
      icon: <Users className="w-8 h-8" />,
      color: "orange",
      stats: [
        { label: "Users/Team", value: "50+" },
        { label: "Projects", value: "∞" },
        { label: "Storage", value: "1TB" },
      ],
      demo: "https://example.com/collab-demo",
      features: [
        "Role management",
        "Version control",
        "Comments",
        "Approval workflow",
      ],
    },
  ];

  // Enhanced Pricing Plans
  const pricingPlans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and freelancers",
      price: 0,
      period: "month",
      features: [
        "5 AI videos/month",
        "10 scripts/month",
        "Basic templates",
        "720p export",
        "Email support",
        "1 user",
        "5GB storage",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      popular: false,
      savings: null,
      badge: "Free Forever",
      limits: {
        videos: "5/month",
        scripts: "10/month",
        storage: "5GB",
        users: "1",
      },
    },
    {
      id: "pro",
      name: "Professional",
      description: "Ideal for content creators and small teams",
      price: 29,
      period: "month",
      features: [
        "50 AI videos/month",
        "100 scripts/month",
        "Premium templates",
        "4K export",
        "Priority support",
        "5 team members",
        "100GB storage",
        "Advanced analytics",
        "Custom branding",
        "API access",
      ],
      buttonText: "Start Pro",
      buttonVariant: "default",
      popular: true,
      savings: "Save 20%",
      badge: "Most Popular",
      limits: {
        videos: "50/month",
        scripts: "100/month",
        storage: "100GB",
        users: "5",
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations and agencies",
      price: 99,
      period: "month",
      features: [
        "Unlimited AI videos",
        "Unlimited scripts",
        "All templates",
        "8K export",
        "24/7 support",
        "Unlimited team members",
        "1TB storage",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
      savings: "Save 30%",
      badge: "Enterprise",
      limits: {
        videos: "Unlimited",
        scripts: "Unlimited",
        storage: "1TB",
        users: "Unlimited",
      },
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "TechFlow Media",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "MLT Script AI has revolutionized our content creation process. We've increased our video output by 300% while maintaining quality.",
      rating: 5,
      video: "https://example.com/testimonial1.mp4",
      stats: { views: "2.5M", engagement: "15%", growth: "+200%" },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Director",
      company: "Global Solutions Inc.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "The AI script generation is incredibly accurate and saves us hours of work. Our marketing campaigns are now more effective than ever.",
      rating: 5,
      video: "https://example.com/testimonial2.mp4",
      stats: { views: "1.8M", engagement: "12%", growth: "+150%" },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Creative Director",
      company: "Digital Dreams Studio",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "The collaboration features are game-changing. Our team can work seamlessly across different time zones and projects.",
      rating: 5,
      video: "https://example.com/testimonial3.mp4",
      stats: { views: "3.2M", engagement: "18%", growth: "+250%" },
    },
  ];

  // Partners/Logos
  const partners = [
    { name: "Google", logo: "https://example.com/google.svg" },
    { name: "Microsoft", logo: "https://example.com/microsoft.svg" },
    { name: "Adobe", logo: "https://example.com/adobe.svg" },
    { name: "Netflix", logo: "https://example.com/netflix.svg" },
    { name: "Disney", logo: "https://example.com/disney.svg" },
    { name: "Spotify", logo: "https://example.com/spotify.svg" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading MLT Script AI...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Modern Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MLT Script AI
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#features"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact
                </a>
                <div className="pt-4 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate("/dashboard")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => navigate("/dashboard")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Content Creation Platform
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Create
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Amazing Content{" "}
              </span>
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transform your ideas into professional videos, scripts, and
              content with our advanced AI platform. Save time, boost
              creativity, and scale your content production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => navigate("/dashboard")}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Creating Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 mb-3 ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Powerful Features for Modern Creators
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need to create, manage, and scale your content
              production
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Loved by Creators Worldwide
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              See how MLT Script AI is transforming content creation for teams
              and individuals
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="flex overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-shrink-0"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonials[currentSlide].avatar}
                          alt={testimonials[currentSlide].name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {testimonials[currentSlide].name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonials[currentSlide].role} at{" "}
                            {testimonials[currentSlide].company}
                          </p>
                          <div className="flex items-center mt-1">
                            {[...Array(testimonials[currentSlide].rating)].map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                        "{testimonials[currentSlide].content}"
                      </blockquote>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {testimonials[currentSlide].stats.views}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Views
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {testimonials[currentSlide].stats.engagement}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Engagement
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {testimonials[currentSlide].stats.growth}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Growth
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of creators who are already using MLT Script AI to
              scale their content production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
                onClick={() => navigate("/dashboard")}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MLT Script AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate AI-powered content creation platform for modern
                creators.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MLT Script AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Demo Video Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
