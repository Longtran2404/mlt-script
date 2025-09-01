import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Play,
  Save,
  Download,
  Share2,
  Users,
  MessageSquare,
  Clock,
  Eye,
  Edit3,
  Plus,
  Search,
  Sparkles,
  Mic,
  Globe,
  Zap,
  Target,
  Lightbulb,
  CheckCircle,
  BookOpen,
  Star,
  X,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";

interface Script {
  id: string;
  title: string;
  content: string;
  language: string;
  genre: string;
  status: "draft" | "review" | "approved" | "completed";
  createdAt: Date;
  updatedAt: Date;
  version: number;
  aiScore: number;
  wordCount: number;
  readingTime: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  content: string;
  language: string;
  genre: string;
  popularity: number;
  rating: number;
}

interface AISuggestion {
  id: string;
  type: "grammar" | "style" | "content" | "structure";
  message: string;
  severity: "low" | "medium" | "high";
  suggestion: string;
  applied: boolean;
}

export default function ScriptCreatorNew() {
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedGenre, setSelectedGenre] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"editor" | "preview" | "split">(
    "editor"
  );
  const [autoSave, setAutoSave] = useState(true);

  // Sample data
  const templates: Template[] = [
    {
      id: "1",
      name: "Marketing Video Script",
      description:
        "Professional marketing video script template with call-to-action",
      category: "Marketing",
      thumbnail:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
      content: "Sample marketing script content...",
      language: "en",
      genre: "marketing",
      popularity: 95,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Educational Content",
      description: "Clear and engaging educational script template",
      category: "Education",
      thumbnail:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
      content: "Sample educational content...",
      language: "en",
      genre: "education",
      popularity: 88,
      rating: 4.6,
    },
  ];

  const aiSuggestions: AISuggestion[] = [
    {
      id: "1",
      type: "grammar",
      message: "Consider using active voice instead of passive voice",
      severity: "medium",
      suggestion:
        'Change "The script was written by the team" to "The team wrote the script"',
      applied: false,
    },
    {
      id: "2",
      type: "style",
      message: "This sentence could be more engaging",
      severity: "low",
      suggestion: "Add emotional language to increase viewer engagement",
      applied: false,
    },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const genres = [
    { code: "general", name: "General", icon: "📝" },
    { code: "marketing", name: "Marketing", icon: "📢" },
    { code: "education", name: "Education", icon: "🎓" },
    { code: "entertainment", name: "Entertainment", icon: "🎬" },
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
      transition: { duration: 0.5 },
    },
  };

  // Handlers
  const handleNewScript = useCallback(() => {
    const newScript: Script = {
      id: Date.now().toString(),
      title: "Untitled Script",
      content: "",
      language: selectedLanguage,
      genre: selectedGenre,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      aiScore: 0,
      wordCount: 0,
      readingTime: 0,
    };
    setCurrentScript(newScript);
    setIsEditing(true);
  }, [selectedLanguage, selectedGenre]);

  const handleSaveScript = useCallback(async () => {
    if (!currentScript) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentScript((prev) =>
      prev
        ? {
            ...prev,
            updatedAt: new Date(),
            version: prev.version + 1,
          }
        : null
    );

    setIsGenerating(false);
  }, [currentScript]);

  const handleAIGenerate = useCallback(async () => {
    if (!currentScript) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCurrentScript((prev) =>
      prev
        ? {
            ...prev,
            content:
              prev.content +
              "\n\n[AI Generated Content: Enhanced script with improved flow and engagement...]",
            updatedAt: new Date(),
            version: prev.version + 1,
          }
        : null
    );

    setIsGenerating(false);
  }, [currentScript]);

  const handleVoiceToText = useCallback(() => {
    setIsRecording(!isRecording);
  }, [isRecording]);

  // Auto-save effect
  useEffect(() => {
    if (!autoSave || !currentScript || !isEditing) return;

    const timer = setTimeout(() => {
      handleSaveScript();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentScript?.content, autoSave, isEditing, handleSaveScript]);

  // Word count calculation
  useEffect(() => {
    if (!currentScript) return;

    const words = currentScript.content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    setCurrentScript((prev) =>
      prev
        ? {
            ...prev,
            wordCount: words,
            readingTime,
          }
        : null
    );
  }, [currentScript?.content]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Script Creator AI
                </span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="hidden md:flex items-center space-x-2"
              >
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  {languages.find((l) => l.code === selectedLanguage)?.name}
                </Badge>
              </motion.div>
            </div>

            {/* Center - Search */}
            <motion.div
              variants={itemVariants}
              className="flex-1 max-w-md mx-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search scripts, templates, or collaborators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
            </motion.div>

            {/* Right side */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(true)}
                className="hidden md:flex"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Templates
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAISuggestions(true)}
                className="hidden md:flex"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                AI Tips
              </Button>

              <Button
                onClick={handleNewScript}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Script
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Left Sidebar */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            {/* Script Info Card */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Script Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  >
                    {genres.map((genre) => (
                      <option key={genre.code} value={genre.code}>
                        {genre.icon} {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                {currentScript && (
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {currentScript.wordCount}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Words
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {currentScript.readingTime}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Min Read
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          AI Score
                        </span>
                        <span className="font-medium">
                          {currentScript.aiScore}/100
                        </span>
                      </div>
                      <Progress value={currentScript.aiScore} className="h-2" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleVoiceToText}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Voice to Text"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "AI Enhance"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Editor Area */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            {!currentScript ? (
              /* Welcome Screen */
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 text-center py-16">
                <CardContent>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Create Your First Script
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Start writing with AI assistance, choose from templates,
                      or begin with a blank canvas.
                    </p>
                    <div className="space-y-3">
                      <Button
                        onClick={handleNewScript}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="lg"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Start Writing
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowTemplates(true)}
                        className="w-full"
                        size="lg"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Browse Templates
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              /* Script Editor */
              <div className="space-y-6">
                {/* Editor Toolbar */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Input
                          value={currentScript.title}
                          onChange={(e) =>
                            setCurrentScript((prev) =>
                              prev ? { ...prev, title: e.target.value } : null
                            )
                          }
                          placeholder="Script Title"
                          className="text-xl font-bold border-0 bg-transparent p-0 focus:ring-0"
                        />

                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              currentScript.status === "draft"
                                ? "secondary"
                                : "success"
                            }
                          >
                            {currentScript.status}
                          </Badge>
                          <Badge variant="outline">
                            v{currentScript.version}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setViewMode(
                              viewMode === "editor" ? "preview" : "editor"
                            )
                          }
                        >
                          {viewMode === "editor" ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <Edit3 className="w-4 h-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveScript}
                          disabled={isGenerating}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isGenerating ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Editor Content */}
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 min-h-[600px]">
                  <CardContent className="p-6">
                    <Textarea
                      value={currentScript.content}
                      onChange={(e) =>
                        setCurrentScript((prev) =>
                          prev ? { ...prev, content: e.target.value } : null
                        )
                      }
                      placeholder="Start writing your script here... Use AI suggestions, voice input, or write manually. The AI will help you improve your content as you write."
                      className="min-h-[500px] text-lg leading-relaxed border-0 bg-transparent p-0 focus:ring-0 resize-none"
                    />
                  </CardContent>
                </Card>

                {/* AI Enhancement Bar */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50 dark:border-blue-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          AI can enhance your script with better flow,
                          engagement, and clarity
                        </span>
                      </div>
                      <Button
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Enhance with AI
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Script Templates
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowTemplates(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => {
                        setCurrentScript({
                          ...currentScript!,
                          title: template.name,
                          content: template.content,
                          genre: template.genre,
                          language: template.language,
                        });
                        setShowTemplates(false);
                        setIsEditing(true);
                      }}
                    >
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{template.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {template.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Popularity: {template.popularity}%</span>
                          <span>{template.language.toUpperCase()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Suggestions Modal */}
      <AnimatePresence>
        {showAISuggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAISuggestions(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 text-purple-600" />
                    AI Suggestions
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAISuggestions(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {aiSuggestions.map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              suggestion.severity === "high"
                                ? "destructive"
                                : suggestion.severity === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {suggestion.type}
                          </Badge>
                          <Badge variant="outline">{suggestion.severity}</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Apply
                        </Button>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {suggestion.message}
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Suggestion:</strong> {suggestion.suggestion}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

