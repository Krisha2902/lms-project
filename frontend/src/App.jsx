import React, { useState } from 'react';
import {
  SparkleIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckIcon,
  ClockIcon,
  ZapIcon,
  GlobeIcon,
  TrendingUpIcon,
  CodeIcon,
  TargetIcon,
  StarIcon,
  BookIcon,
  LayersIcon,
  UsersIcon,
  CompassIcon,
  SphereIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon
} from './components/Icons';

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Weekly Goal Tracker state
  const [weeklyDays, setWeeklyDays] = useState([
    { day: 'M', checked: true },
    { day: 'T', checked: true },
    { day: 'W', checked: true },
    { day: 'T', checked: true },
    { day: 'F', checked: false }
  ]);

  // Lesson preview modal
  const [activeModalCourse, setActiveModalCourse] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Email form state
  const [emailInput, setEmailInput] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Toggle a day in weekly goal
  const toggleDay = (index) => {
    setWeeklyDays((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], checked: !updated[index].checked };
      const completedCount = updated.filter((d) => d.checked).length;
      showToast(`Goal updated: ${completedCount} of 5 days completed!`);
      return updated;
    });
  };

  const completedCount = weeklyDays.filter((d) => d.checked).length;

  // Handle newsletter / signup submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribeSuccess(true);
    showToast(`🎉 Welcome to Luma! Confirmation sent to ${emailInput}`);
    setTimeout(() => {
      setEmailInput('');
      setSubscribeSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafcf9] text-[#0f2317] relative selection:bg-[#c3f53c] selection:text-[#0d2d1f]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2d1e] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-700/50 flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-[#c3f53c] text-[#0f2d1e] flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* ========================================================
          1. HEADER & NAVBAR
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#fafcf9]/85 backdrop-blur-md border-b border-[#edf2ea] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#0f2d1e] flex items-center justify-center text-[#c3f53c] shadow-sm transition-transform group-hover:scale-105">
              <SparkleIcon className="w-4 h-4 fill-[#c3f53c]" />
            </div>
            <span className="text-[22px] font-bold tracking-tight text-[#0f2d1e] font-sans">
              luma<span className="text-[#0f2d1e]">.</span>
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-[#354d3e]">
            <a href="#courses" className="hover:text-[#0f2d1e] transition-colors">
              Courses
            </a>
            <a href="#categories" className="hover:text-[#0f2d1e] transition-colors">
              Categories
            </a>
            <a href="#why-luma" className="hover:text-[#0f2d1e] transition-colors">
              For Teams
            </a>
            <a href="#stories" className="hover:text-[#0f2d1e] transition-colors">
              Success stories
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-5">
            <button
              onClick={() => showToast('Log in modal opened')}
              className="text-sm font-medium text-[#2d4737] hover:text-[#0f2d1e] transition-colors cursor-pointer px-2 py-1"
            >
              Log in
            </button>
            <button
              onClick={() => {
                showToast('Welcome! Get ready to start learning.');
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0f2d1e] hover:bg-[#1a442e] text-white text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Start learning</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#0f2d1e] hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#fafcf9] border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-3 text-base font-medium text-[#354d3e]">
              <a
                href="#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0f2d1e] py-1"
              >
                Courses
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0f2d1e] py-1"
              >
                Categories
              </a>
              <a
                href="#why-luma"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0f2d1e] py-1"
              >
                For Teams
              </a>
              <a
                href="#stories"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#0f2d1e] py-1"
              >
                Success stories
              </a>
            </nav>
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  showToast('Log in modal opened');
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-[#0f2d1e]"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#0f2d1e] text-white text-sm font-semibold py-3 rounded-full flex items-center justify-center gap-2"
              >
                <span>Start learning</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          2. HERO SECTION (IMAGE 1)
      ======================================================== */}
      <section className="relative overflow-hidden bg-subtle-grid hero-glow pt-10 sm:pt-16 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e2e8e0] shadow-2xs backdrop-blur-xs mb-8">
                <SparkleIcon className="w-3.5 h-3.5 fill-[#1e3d2b] text-[#1e3d2b]" />
                <span className="text-[11px] font-bold tracking-wider text-[#1e3d2b] uppercase">
                  LEARNING BUILT FOR YOUR AMBITION
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-[#0f2317] leading-[1.08] mb-6">
                Learn boldly.
                <br />
                <span className="font-editorial text-[#164e33] font-normal text-6xl sm:text-7xl lg:text-[84px] leading-tight inline-block">
                  Grow brilliantly.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#55695b] max-w-lg leading-relaxed mb-8 font-normal">
                Expert-led courses, practical projects, and a community that helps you turn curiosity
                into real-world skills.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href="#courses"
                  className="bg-[#c3f53c] hover:bg-[#b0e828] text-[#0f2317] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Explore courses</span>
                  <ArrowRightIcon className="w-4 h-4 text-[#0f2317]" />
                </a>

                <button
                  onClick={() =>
                    setActiveModalCourse({
                      title: 'Welcome to Luma',
                      category: 'ORIENTATION',
                      lessons: 6,
                      duration: '15m',
                      video: true
                    })
                  }
                  className="bg-white hover:bg-[#f5f8f3] text-[#0f2317] border border-[#e2e8e0] font-medium text-sm sm:text-base px-5 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[#0f2317]">
                    <PlayIcon className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>See how it works</span>
                </button>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex items-center gap-8 text-xs sm:text-sm text-[#4d6354] font-medium">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[#164e33]" />
                  <span>Learn at your pace</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-[#164e33]" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Mockup (Alex's Learning Card) */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Decorative soft lime badge peeking from behind the left */}
              <div className="absolute -left-3 sm:-left-4 top-28 w-10 h-16 bg-[#d9f99d] rounded-2xl -rotate-6 opacity-75 pointer-events-none -z-0"></div>

              {/* Main White Card */}
              <div className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-emerald-950/8 border border-[#e8efe6]">
                {/* Card Top: Subtitle + Greeting + User Avatar */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-1">
                      MY LEARNING
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0f2317] tracking-tight">
                      Good morning, Alex
                    </h2>
                  </div>
                  <div
                    title="Alex Morgan (You)"
                    className="w-8 h-8 rounded-full bg-[#d89758] text-white font-semibold text-xs flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90"
                  >
                    AM
                  </div>
                </div>

                {/* Dark Forest Green Inner Banner Card */}
                <div className="bg-[#0f2d1e] rounded-2xl p-4.5 text-white shadow-md relative mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#c3f53c] flex items-center justify-center text-[#0f2d1e] shrink-0 mt-0.5">
                      <SparkleIcon className="w-3.5 h-3.5 fill-[#0f2d1e]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-widest text-emerald-300 uppercase block">
                        CONTINUE LEARNING
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
                        Design Thinking Essentials
                      </h3>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="flex items-center justify-between text-xs text-emerald-200/80 font-medium mb-1.5">
                    <span>8 of 12 lessons</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                    <div className="w-[68%] h-full bg-[#c3f53c] rounded-full transition-all duration-500"></div>
                  </div>

                  {/* Resume Lesson Button */}
                  <button
                    onClick={() =>
                      setActiveModalCourse({
                        title: 'Design Thinking Essentials',
                        category: 'DESIGN & STRATEGY',
                        lessons: 12,
                        currentLesson: 'Lesson 8: Rapid Prototyping & User Testing',
                        duration: '4h 15m',
                        progress: 68
                      })
                    }
                    className="w-full bg-white hover:bg-emerald-50 text-[#0f2d1e] font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                  >
                    <PlayIcon className="w-3 h-3 fill-current ml-0.5" />
                    <span>Resume lesson</span>
                  </button>
                </div>

                {/* Metrics Row (Side-by-side) */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Metric 1: Time Learned */}
                  <div className="bg-[#fbfcfb] border border-[#f0f4ee] rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center shrink-0">
                      <ClockIcon className="w-4 h-4 text-[#7c3aed]" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-[#0f2317]">12.5h</div>
                      <div className="text-[11px] text-gray-500">Time learned</div>
                    </div>
                  </div>

                  {/* Metric 2: Current Streak */}
                  <div className="bg-[#fbfcfb] border border-[#f0f4ee] rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
                      <ZapIcon className="w-4 h-4 fill-[#d97706]" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-[#0f2317]">9 days</div>
                      <div className="text-[11px] text-gray-500">Current streak</div>
                    </div>
                  </div>
                </div>

                {/* Weekly Goal Row */}
                <div className="bg-[#fbfcfb] border border-[#f0f4ee] rounded-2xl p-3.5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-semibold text-xs text-[#0f2317]">Weekly goal</span>
                    <span className="text-xs font-semibold text-gray-500">
                      {completedCount}/5 days
                    </span>
                  </div>
                  {/* 5 circles */}
                  <div className="flex items-center justify-between">
                    {weeklyDays.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleDay(idx)}
                        title={`Click to toggle ${item.day}`}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all transform hover:scale-105 cursor-pointer ${
                          item.checked
                            ? 'bg-[#c3f53c] text-[#0f2d1e] shadow-2xs'
                            : 'bg-[#f3f4f6] text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {item.checked ? <CheckIcon className="w-3.5 h-3.5 text-[#0f2d1e]" /> : item.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overlapping Floating Badge on Bottom Right */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-2xl p-2.5 px-3.5 shadow-xl border border-gray-100 flex items-center gap-3 z-20">
                  {/* Avatar stack */}
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#c26d36] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                      NK
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#818cf8] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                      JR
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#10b981] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                      LS
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#e5e7eb] text-gray-700 text-[8px] font-bold flex items-center justify-center border-2 border-white">
                      +2k
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 whitespace-nowrap">
                    Learning together today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. TRUSTED BY LEARNERS AT (IMAGE 1 BOTTOM)
      ======================================================== */}
      <section className="border-t border-b border-[#edf2ea] bg-[#fafcf9] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[11px] font-bold tracking-widest text-gray-400 uppercase text-center md:text-left leading-tight shrink-0">
            TRUSTED BY LEARNERS
            <br />
            AT
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-between w-full max-w-4xl gap-8 sm:gap-12 text-gray-400 font-semibold tracking-wider">
            {/* Northstar */}
            <div className="flex items-center gap-1.5 text-gray-600 font-bold tracking-wider hover:text-gray-900 transition-colors">
              <span className="text-sm sm:text-base font-extrabold tracking-widest">NORTHSTAR</span>
            </div>

            {/* Apex */}
            <div className="flex items-center gap-1.5 text-gray-600 font-bold hover:text-gray-900 transition-colors">
              <span className="text-base sm:text-lg font-black tracking-widest">APEX</span>
            </div>

            {/* Vertex */}
            <div className="text-gray-600 font-medium italic text-base sm:text-lg tracking-tight hover:text-gray-900 transition-colors font-sans">
              vertex
            </div>

            {/* Studio/24 */}
            <div className="text-gray-600 font-bold text-sm sm:text-base tracking-widest hover:text-gray-900 transition-colors">
              STUDIO/24
            </div>

            {/* Orbital */}
            <div className="text-gray-600 font-medium text-base sm:text-lg tracking-tight hover:text-gray-900 transition-colors">
              Orbital
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CATEGORIES SECTION (IMAGE 2)
      ======================================================== */}
      <section id="categories" className="py-20 lg:py-28 bg-[#fafcf9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8e0] shadow-2xs mb-5">
                <GlobeIcon className="w-3.5 h-3.5 text-[#1e3d2b]" />
                <span className="text-[11px] font-bold tracking-wider text-[#1e3d2b] uppercase">
                  EXPLORE YOUR NEXT SKILL
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2317] leading-[1.1]">
                Find what moves
                <br />
                <span className="font-editorial text-[#164e33] font-normal text-4xl sm:text-5xl inline-block mt-1">
                  you forward.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 max-w-sm lg:pb-2 leading-relaxed">
              Choose from hundreds of courses built with industry experts and designed to fit your life.
            </p>
          </div>

          {/* 4 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Business & Strategy (Featured Bright Lime) */}
            <div
              onClick={() => showToast('Filtered courses: Business & Strategy')}
              className="bg-[#c3f53c] rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f2d1e] text-[#c3f53c] flex items-center justify-center shadow-sm mb-6 transition-transform group-hover:scale-105">
                  <TrendingUpIcon className="w-5 h-5 text-[#c3f53c]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f2d1e]/75 block mb-2">
                  124 COURSES
                </span>
                <h3 className="text-xl font-bold text-[#0f2d1e] mb-2 leading-snug">
                  Business &amp; Strategy
                </h3>
                <p className="text-sm text-[#0f2d1e]/85 leading-relaxed">
                  Build strategic thinking and leadership skills.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#0f2d1e] group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRightIcon className="w-4 h-4 text-[#0f2d1e]" />
              </div>
            </div>

            {/* Card 2: Technology */}
            <div
              onClick={() => showToast('Filtered courses: Technology')}
              className="bg-white rounded-3xl p-7 border border-[#e8ece6] flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shadow-2xs mb-6 transition-transform group-hover:scale-105">
                  <CodeIcon className="w-5 h-5 text-[#164e33]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  98 COURSES
                </span>
                <h3 className="text-xl font-bold text-[#0f2317] mb-2 leading-snug">
                  Technology
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Master the tools shaping tomorrow.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#0f2317] group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRightIcon className="w-4 h-4 text-[#0f2317]" />
              </div>
            </div>

            {/* Card 3: Design & Creative */}
            <div
              onClick={() => showToast('Filtered courses: Design & Creative')}
              className="bg-white rounded-3xl p-7 border border-[#e8ece6] flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shadow-2xs mb-6 transition-transform group-hover:scale-105">
                  <SparkleIcon className="w-5 h-5 fill-[#164e33]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  76 COURSES
                </span>
                <h3 className="text-xl font-bold text-[#0f2317] mb-2 leading-snug">
                  Design &amp; Creative
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Turn bold ideas into meaningful experiences.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#0f2317] group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRightIcon className="w-4 h-4 text-[#0f2317]" />
              </div>
            </div>

            {/* Card 4: Personal Growth */}
            <div
              onClick={() => showToast('Filtered courses: Personal Growth')}
              className="bg-white rounded-3xl p-7 border border-[#e8ece6] flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shadow-2xs mb-6 transition-transform group-hover:scale-105">
                  <TargetIcon className="w-5 h-5 text-[#164e33]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  63 COURSES
                </span>
                <h3 className="text-xl font-bold text-[#0f2317] mb-2 leading-snug">
                  Personal Growth
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Develop habits that move you forward.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#0f2317] group-hover:gap-3 transition-all">
                <span>Explore</span>
                <ArrowRightIcon className="w-4 h-4 text-[#0f2317]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. COURSES WORTH SHOWING UP FOR (IMAGE 3)
      ======================================================== */}
      <section id="courses" className="py-20 lg:py-28 bg-[#0c251b] text-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-200 shadow-2xs mb-5">
                <StarIcon className="w-3.5 h-3.5 fill-[#c3f53c] text-[#c3f53c]" />
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  LEARNER FAVORITES
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Courses worth
                <br />
                <span className="font-editorial text-[#c3f53c] font-normal text-4xl sm:text-5xl inline-block mt-1">
                  showing up for.
                </span>
              </h2>
            </div>

            {/* View all courses button */}
            <button
              onClick={() => showToast('Showing all 250+ expert courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white hover:bg-white/10 text-sm font-semibold transition-all duration-200 self-start md:self-auto cursor-pointer"
            >
              <span>View all courses</span>
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* 3 Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Course Card 1: Product Strategy & Growth */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              {/* Visual Top Banner */}
              <div className="h-52 bg-gradient-to-br from-[#cbf55c] via-[#b8eb49] to-[#a4e132] relative flex items-center justify-center overflow-hidden">
                {/* Ripple rings */}
                <div className="absolute w-44 h-44 ripple-circle pointer-events-none opacity-40"></div>
                <div className="absolute w-32 h-32 ripple-circle pointer-events-none opacity-60"></div>
                <div className="absolute w-20 h-20 ripple-circle pointer-events-none opacity-80"></div>

                {/* Level Tag Top-Left */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#0f2317] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                  Intermediate
                </span>

                {/* Floating Centered Icon Card */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/95 shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <TrendingUpIcon className="w-7 h-7 text-[#0f2d1e]" />
                </div>
              </div>

              {/* Bottom Details Content */}
              <div className="p-6 text-[#0f2317] flex flex-col justify-between grow">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#164e33] block mb-1.5">
                    BUSINESS
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-6">
                    Product Strategy &amp; Growth
                  </h3>
                </div>

                {/* Footer Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <BookIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>18 lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>6h 20m</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setActiveModalCourse({
                        title: 'Product Strategy & Growth',
                        category: 'BUSINESS',
                        level: 'Intermediate',
                        lessons: 18,
                        duration: '6h 20m',
                        instructor: 'Elena Rostova, VP of Growth',
                        description:
                          'Learn how top product leaders define vision, build growth loops, and prioritize high-impact roadmaps.'
                      })
                    }
                    className="w-9 h-9 rounded-full bg-[#0f2d1e] hover:bg-[#1a442e] text-white flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer shadow-xs"
                    aria-label="View course details"
                  >
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 2: Modern Frontend Foundations */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              {/* Visual Top Banner */}
              <div className="h-52 bg-gradient-to-br from-[#dff2fe] via-[#cae8fd] to-[#b7ddfb] relative flex items-center justify-center overflow-hidden">
                {/* Ripple rings */}
                <div className="absolute w-44 h-44 ripple-circle pointer-events-none opacity-40"></div>
                <div className="absolute w-32 h-32 ripple-circle pointer-events-none opacity-60"></div>
                <div className="absolute w-20 h-20 ripple-circle pointer-events-none opacity-80"></div>

                {/* Level Tag Top-Left */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#0f2317] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                  Beginner
                </span>

                {/* Floating Centered Icon Card */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/95 shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <CodeIcon className="w-7 h-7 text-[#0284c7]" />
                </div>
              </div>

              {/* Bottom Details Content */}
              <div className="p-6 text-[#0f2317] flex flex-col justify-between grow">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#164e33] block mb-1.5">
                    DEVELOPMENT
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-6">
                    Modern Frontend Foundations
                  </h3>
                </div>

                {/* Footer Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <BookIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>24 lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>8h 45m</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setActiveModalCourse({
                        title: 'Modern Frontend Foundations',
                        category: 'DEVELOPMENT',
                        level: 'Beginner',
                        lessons: 24,
                        duration: '8h 45m',
                        instructor: 'Marcus Vance, Staff Engineer',
                        description:
                          'Master modern React 19, JavaScript ESNext, Tailwind CSS, and component architectures with hands-on practice.'
                      })
                    }
                    className="w-9 h-9 rounded-full bg-[#0f2d1e] hover:bg-[#1a442e] text-white flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer shadow-xs"
                    aria-label="View course details"
                  >
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 3: UI Design Systems That Scale */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              {/* Visual Top Banner */}
              <div className="h-52 bg-gradient-to-br from-[#f3e8ff] via-[#e9d5ff] to-[#dfc4ff] relative flex items-center justify-center overflow-hidden">
                {/* Ripple rings */}
                <div className="absolute w-44 h-44 ripple-circle pointer-events-none opacity-40"></div>
                <div className="absolute w-32 h-32 ripple-circle pointer-events-none opacity-60"></div>
                <div className="absolute w-20 h-20 ripple-circle pointer-events-none opacity-80"></div>

                {/* Level Tag Top-Left */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#0f2317] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                  Advanced
                </span>

                {/* Floating Centered Icon Card */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/95 shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <SparkleIcon className="w-7 h-7 fill-[#9333ea]" />
                </div>
              </div>

              {/* Bottom Details Content */}
              <div className="p-6 text-[#0f2317] flex flex-col justify-between grow">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#164e33] block mb-1.5">
                    DESIGN
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-6">
                    UI Design Systems That Scale
                  </h3>
                </div>

                {/* Footer Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <BookIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>16 lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>5h 10m</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setActiveModalCourse({
                        title: 'UI Design Systems That Scale',
                        category: 'DESIGN',
                        level: 'Advanced',
                        lessons: 16,
                        duration: '5h 10m',
                        instructor: 'Sarah Lin, Principal Product Designer',
                        description:
                          'Build tokenized multi-platform design systems in Figma and React that support dozens of cross-functional teams.'
                      })
                    }
                    className="w-9 h-9 rounded-full bg-[#0f2d1e] hover:bg-[#1a442e] text-white flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer shadow-xs"
                    aria-label="View course details"
                  >
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WHY LEARNERS CHOOSE LUMA (IMAGE 4 TOP)
      ======================================================== */}
      <section id="why-luma" className="py-20 lg:py-28 bg-[#fafcf9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Mockup Graphic (Product Designer Path) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-tr from-[#ecf7dd] via-[#e2f5ce] to-[#eaf7db] rounded-3xl p-6 sm:p-8 relative flex items-center justify-center overflow-hidden shadow-xs">
                {/* Decorative circular arcs in backdrop */}
                <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full border border-emerald-600/10 pointer-events-none"></div>
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-emerald-600/10 pointer-events-none"></div>

                {/* White Path Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 w-full relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-0.5">
                        YOUR PATH
                      </span>
                      <h4 className="font-bold text-lg text-gray-900">Product Designer</h4>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[#c3f53c]/70 text-[#0f2d1e] flex items-center justify-center">
                      <SphereIcon className="w-4 h-4 text-[#0f2d1e]" />
                    </div>
                  </div>

                  {/* Stepper Timeline */}
                  <div className="space-y-4 relative mb-5">
                    {/* Step 1: Foundations of UX */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs">
                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="grow">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            Foundations of UX
                          </span>
                          <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-500">Completed</span>
                      </div>
                      {/* Vertical line connector */}
                      <div className="absolute left-3 top-7 w-0.5 h-6 bg-[#10b981] -translate-x-1/2"></div>
                    </div>

                    {/* Step 2: Design Systems */}
                    <div className="flex items-start gap-3 relative pt-2">
                      <div className="w-6 h-6 rounded-full bg-[#c3f53c] border-2 border-[#164e33] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <div className="w-2 h-2 rounded-full bg-[#164e33]"></div>
                      </div>
                      <div className="grow">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">Design Systems</span>
                          <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-xs text-emerald-700 font-medium">
                          In progress · 68%
                        </span>
                      </div>
                      {/* Vertical line connector */}
                      <div className="absolute left-3 top-9 w-0.5 h-6 bg-gray-200 -translate-x-1/2"></div>
                    </div>

                    {/* Step 3: Product Strategy */}
                    <div className="flex items-start gap-3 relative pt-2">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center shrink-0 mt-0.5"></div>
                      <div className="grow">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            Product Strategy
                          </span>
                          <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-400">Up next</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Path Progress Box */}
                  <div className="bg-[#0f2d1e] rounded-xl p-3.5 text-white">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-gray-300 text-[11px] uppercase tracking-wider">
                        Path progress
                      </span>
                      <span className="font-bold text-[#c3f53c]">62%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div className="w-[62%] h-full bg-[#c3f53c] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content & 4 Features Grid */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8e0] shadow-2xs mb-5">
                <ZapIcon className="w-3.5 h-3.5 fill-[#1e3d2b] text-[#1e3d2b]" />
                <span className="text-[11px] font-bold tracking-wider text-[#1e3d2b] uppercase">
                  WHY LEARNERS CHOOSE LUMA
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0f2317] leading-[1.1] mb-5">
                Learning that
                <br />
                <span className="font-editorial text-[#164e33] font-normal text-4xl sm:text-5xl inline-block mt-1">
                  actually sticks.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed mb-10">
                No endless lectures. Just engaging lessons, hands-on practice, and meaningful
                feedback designed around how people learn best.
              </p>

              {/* 4 Feature Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Feature 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shrink-0 mt-0.5">
                    <LayersIcon className="w-5 h-5 text-[#164e33]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                      Practical by design
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Apply your skills through real-world projects.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shrink-0 mt-0.5">
                    <UsersIcon className="w-5 h-5 text-[#164e33]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                      Learn together
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Get support from peers and expert mentors.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shrink-0 mt-0.5">
                    <CompassIcon className="w-5 h-5 text-[#164e33]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                      Paths with purpose
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Follow a clear roadmap to your goals.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4ec] text-[#164e33] flex items-center justify-center shrink-0 mt-0.5">
                    <ClockIcon className="w-5 h-5 text-[#164e33]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                      Built for real life
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Bite-sized lessons that fit your schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. TESTIMONIAL CARD (IMAGE 4 MIDDLE)
      ======================================================== */}
      <section id="stories" className="py-12 px-6 lg:px-12 bg-[#fafcf9]">
        <div className="max-w-5xl mx-auto bg-[#ede9fe] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-xs border border-purple-100">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1.5 mb-6 text-[#7c3aed]">
            <StarIcon className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]" />
            <StarIcon className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]" />
            <StarIcon className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]" />
            <StarIcon className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]" />
            <StarIcon className="w-4 h-4 fill-[#7c3aed] text-[#7c3aed]" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-gray-900 max-w-3xl mx-auto leading-snug sm:leading-tight mb-8">
            “Luma made learning feel less like a task and more like momentum. I landed a new role
            within three months.”
          </blockquote>

          {/* Author Details */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#7c3aed] text-white text-xs font-bold flex items-center justify-center mb-2.5 shadow-xs">
              MK
            </div>
            <div className="font-bold text-sm text-gray-900">Maya Kim</div>
            <div className="text-xs text-gray-600 font-medium">Product designer at Arc</div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. READY TO GROW? CTA BANNER (IMAGE 4 LOWER)
      ======================================================== */}
      <section className="bg-[#c3f53c] py-16 sm:py-20 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Title */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f2d1e]/80 block mb-2">
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2d1e] tracking-tight">
              Ready to grow?
            </h2>
          </div>

          {/* Right Input Form */}
          <form
            onSubmit={handleEmailSubmit}
            className="w-full max-w-md bg-white rounded-full p-2 pl-6 flex items-center shadow-lg border border-white/60 focus-within:ring-2 focus-within:ring-[#0f2d1e]/30 transition-all"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
              required
            />
            <button
              type="submit"
              className="bg-[#0f2d1e] hover:bg-[#1a442e] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs shrink-0"
            >
              <span>Start for free</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================
          9. FOOTER (IMAGE 4 BOTTOM)
      ======================================================== */}
      <footer className="bg-[#0a2016] text-white py-12 px-6 lg:px-16 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#c3f53c] flex items-center justify-center text-[#0a2016] shadow-sm transition-transform group-hover:scale-105">
              <SparkleIcon className="w-4 h-4 fill-[#0a2016]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              luma<span className="text-[#c3f53c]">.</span>
            </span>
          </a>

          {/* Center: Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-7 text-xs sm:text-sm font-medium text-gray-300">
            <a href="#courses" className="hover:text-white transition-colors">
              Courses
            </a>
            <a href="#categories" className="hover:text-white transition-colors">
              Categories
            </a>
            <a href="#why-luma" className="hover:text-white transition-colors">
              For teams
            </a>
            <a href="#stories" className="hover:text-white transition-colors">
              Stories
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast('Privacy Policy: We never share your data.');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-xs text-gray-400 font-normal">
            © 2026 Luma Learning
          </div>
        </div>
      </footer>

      {/* ========================================================
          10. INTERACTIVE MODAL (LESSON & COURSE VIEWER)
      ======================================================== */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setActiveModalCourse(null);
                setIsVideoPlaying(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e33] bg-[#eaf4ec] px-3 py-1 rounded-full">
                {activeModalCourse.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-3">
                {activeModalCourse.title}
              </h3>
              {activeModalCourse.instructor && (
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Instructor: {activeModalCourse.instructor}
                </p>
              )}
            </div>

            {/* Video Player Mockup */}
            <div className="w-full h-52 bg-[#0c251b] rounded-2xl relative overflow-hidden flex items-center justify-center my-4 group">
              {isVideoPlaying ? (
                <div className="text-center p-6 text-white space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#c3f53c] text-[#0f2d1e] flex items-center justify-center mx-auto animate-pulse">
                    <PlayIcon className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <p className="text-sm font-semibold">Playing Lesson Audio &amp; Video...</p>
                  <p className="text-xs text-emerald-300">
                    {activeModalCourse.currentLesson || 'Module 1: Introduction & Case Studies'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-radial from-transparent to-black/40"></div>
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative z-10 w-14 h-14 rounded-full bg-[#c3f53c] hover:bg-[#b0e828] text-[#0f2d1e] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                  >
                    <PlayIcon className="w-6 h-6 fill-current ml-1" />
                  </button>
                  <span className="absolute bottom-4 left-4 text-xs text-white/80 font-medium">
                    Duration: {activeModalCourse.duration}
                  </span>
                </>
              )}
            </div>

            {/* Course description or syllabus */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {activeModalCourse.description ||
                'This hands-on course gives you interactive lessons, exercises, downloadable templates, and mentor reviews to accelerate your professional growth.'}
            </p>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setActiveModalCourse(null);
                  setIsVideoPlaying(false);
                }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModalCourse(null);
                  setIsVideoPlaying(false);
                  showToast(`🚀 Successfully enrolled in ${activeModalCourse.title}!`);
                }}
                className="bg-[#0f2d1e] hover:bg-[#1a442e] text-white text-sm font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Continue Course</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
