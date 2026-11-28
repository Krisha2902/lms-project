# Interactive Learning Management System (LMS)
## Master Implementation Plan & Day-Wise Tracking Checklist

> **Project Reference:** Axlero Digital Transformation — Education & EdTech LMS  
> **Target SLA:** API Latency < 200ms | Immutable State Machine Integrity | Secure Asset Delivery  
> **Tech Stack:** Node.js / Express 5 + MongoDB / Mongoose + React 19 + Tailwind CSS 4

---

## 🟢 Already Completed (Abhi Tak Kya Ho Chuka Hai)

Aapke project mein ye foundational cheezein pehle se setup hain:

- [x] **Frontend Foundation & Landing Page**: React 19 + Vite + Tailwind CSS 4 setup complete.
- [x] **Complete Luma Homepage**: Hero section, Alex learning card mockup, Trusted By bar, Categories, Featured Courses, Why Learners Choose Luma, Testimonials, CTA banner, Footer, and responsive mobile nav.
- [x] **Backend Skeleton & Dependencies**: Express 5 server setup, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `mongoose` installed.
- [x] **Database Connection**: MongoDB connection logic (`config/db.js`) with `.env` integration.
- [x] **Directory Architecture**: Backend folder structure (`config/`, `middleware/`, `models/`, `routes/`, `services/`, `utils/`).

---

## 📋 Remaining Day-Wise Checklist (Jo Kaam Bacha Hai)

---

### 🔹 PHASE 1: Core Architecture, Auth & Access Control

#### [ ] Day 1: User Schema, Password Hashing & JWT Auth (ASSIGNED TO TEAMMATE)
- [ ] *Teammate Scope*: `models/User.js`, Auth controllers (`register`, `login`, `getMe`), JWT issuance, and login/signup frontend pages.
- [ ] Backend routes will mount at `/api/auth` once teammate integration is completed.

#### [x] Day 2: Course & Curriculum Schema Architecture (COMPLETED)
- [x] `models/Course.js` implemented with deeply nested hierarchy:
  - Root: `title`, `slug` (auto-generated from title), `subtitle`, `description`, `instructorId`, `price`, `thumbnailUrl`, `category`, `level`, `isPublished`.
  - Chapters Subdocument: `chapterId`, `title`, `order`, `summary`.
  - Lessons Subdocument: `lessonId`, `title`, `order`, `contentType` (`video`, `article`, `quiz`), `videoUrl`, `textContent`, `durationMinutes`, `isFreePreview`.
- [x] Compound performance indexes configured for < 200ms latency SLA: `{ slug: 1 }`, `{ instructorId: 1 }`, `{ isPublished: 1, category: 1 }`.
- [x] Standalone Course Controller (`controllers/courseController.js`) and routes (`routes/courseRoutes.js`) mounted at `/api/courses`.
- [x] Tested and verified: course creation and browsing operate completely standalone without conflicting with teammate's auth work.

#### [x] Day 3: Enrollment Engine & Secure Access Gate (COMPLETED)
- [x] `models/Enrollment.js` schema implemented (`studentId`, `courseId`, `status: ['active', 'completed', 'dropped']`, `enrolledAt`, `lastAccessedAt`).
- [x] Compound unique index `{ studentId: 1, courseId: 1 }` created to enforce State Machine Integrity and prevent duplicate enrollments at DB level.
- [x] Query index `{ studentId: 1, status: 1 }` configured for ultra-fast "my-courses" dashboard queries (< 200ms latency SLA).
- [x] Enrollment controller (`controllers/enrollmentController.js`) and routes (`routes/enrollmentRoutes.js`) mounted at `/api/enrollments`:
  - `POST /api/enrollments/enroll/:courseId` (idempotent course enrollment)
  - `GET /api/enrollments/my-courses` (fetch student's enrolled courses with course details)
  - `GET /api/enrollments/check/:courseId` (real-time enrollment verification)
- [x] `middleware/checkEnrollment.js` access gatekeeper implemented:
  - Grants access if student has active enrollment.
  - Grants access if lesson is marked `isFreePreview: true`.
  - Blocks unauthorized / non-enrolled students with `403 Forbidden` (`GET /api/courses/:courseId/lessons/:lessonId/content`).

#### [x] Day 4: Phase 1 Integration Tests & API Contracts (COMPLETED ✅)
- [x] Standard Postman Collection v2.1 export generated at `doc/LMS_Phase1_Postman_Collection.json` with sample request/response payloads for Courses and Enrollment APIs.
- [x] Automated Integration Test Suite built at `backend/tests/phase1.integration.js` covering Health Check, 404 Interceptor, Course Validation, ID Format Gates, Access Gatekeeper (locked vs free preview lessons), and SLA Benchmarking.
- [x] Verified 100% test pass rate (9/9 tests passed) with average latency under 1ms, strictly satisfying the project's `< 200ms API Latency SLA`.
- [x] Milestone Tag: Phase 1 (Week 1 Core Architecture, Course Schema & Enrollment Access Gates) is verified and ready for Phase 2.

---

### 🔹 PHASE 2: Curriculum Builder (Instructor Portal)

#### [ ] Day 5: Instructor Portal Shell & Course Listing
- [ ] Frontend Instructor Portal layout create karna (Sidebar, Navigation, Context Header).
- [ ] Instructor Course Dashboard UI: Stats cards (Total Courses, Active Students, Revenue).
- [ ] Author courses table with status badges (`Draft` vs `Published`).
- [ ] Backend route: `PUT /api/courses/:id/publish` toggle endpoint.
- [ ] *Verification*: Instructor login karke apne courses ki list dekh sake aur publish/unpublish toggle kar sake.

#### [ ] Day 6: Step 1 Course Meta Wizard (Creation Form)
- [ ] Multi-step Course Creation Wizard UI.
- [ ] Step 1 Form: Title, Subtitle, Category dropdown, Difficulty level (`Beginner`, `Intermediate`, `Advanced`), Price.
- [ ] Course thumbnail uploader / URL previewer with validation.
- [ ] Form submit connect karna backend `POST /api/courses` endpoint ke sath.
- [ ] *Verification*: Naya course draft create ho aur automatically unique slug generate ho.

#### [ ] Day 7: Deeply Nested Curriculum Builder UI (Chapter & Lesson Tree)
- [ ] Dynamic tree editor UI:
  - Chapter Accordion list: Add Chapter, inline edit title, delete chapter.
  - Sub-accordion Lesson list: Add Lesson (Video, Article, Quiz options).
- [ ] Reordering controls (Move Up / Down ya Drag-and-drop) with reactive local state.
- [ ] *Verification*: Complex 3-chapter, 10-lesson curriculum create karke local UI state mein render karna.

#### [ ] Day 8: Atomic Backend Mutations for Nested Curriculum
- [ ] Granular atomic endpoints implement karna (pure document overwrite avoid karne ke liye):
  - `POST /api/courses/:id/chapters` (using `$push`)
  - `PUT /api/courses/:id/chapters/:chapterId` (using `$set`)
  - `DELETE /api/courses/:id/chapters/:chapterId` (using `$pull`)
  - `POST /api/courses/:id/chapters/:chapterId/lessons` (using `$push`)
  - `PUT /api/courses/:id/chapters/:chapterId/lessons/:lessonId` (using `$set`)
  - `DELETE /api/courses/:id/chapters/:chapterId/lessons/:lessonId` (using `$pull`)
- [ ] *Verification*: Nested lesson update karte waqt doosre lessons ka data corrupt na ho.

#### [ ] Day 9: Instructor Analytics Overview
- [ ] Course Analytics UI page:
  - Per-course enrolled student count.
  - Lesson completion breakdown.
  - Visual completion distribution chart.
- [ ] Analytics aggregation endpoint: `GET /api/analytics/instructor/courses`.
- [ ] *Verification*: Enrollments hone par analytics numbers dynamically reflect karein.

#### [ ] Day 10: Instructor Portal QA & Hardening
- [ ] Full-cycle testing: Course create -> Chapters add -> Lessons attach -> Publish.
- [ ] Form validation rules check (empty chapter/lesson prevent karna).
- [ ] Git commit milestone tag `v0.2.0-curriculum-builder`.

---

### 🔹 PHASE 3: Student Learning Environment & Linear Progression

#### [ ] Day 11: Student Dashboard & Classroom Shell
- [ ] Student Learning Hub: "My Enrolled Courses", "Recently Accessed", with progress bar previews.
- [ ] Distraction-free Classroom Shell:
  - Collapsible curriculum drawer (Left/Right) showing Chapters & Lessons with status badges (Lock, Completed checkmark, Active play icon).
  - Header: Course Title, Total Progress Bar, Exit to Dashboard button.
  - Center: Dynamic Content Viewport.
- [ ] *Verification*: Responsive classroom layout mobile aur desktop dono par test karna.

#### [ ] Day 12: Content Consumption Players (Video & Rich Text)
- [ ] Video Player Viewport:
  - Custom video controls (speed: 0.75x to 2x, theater mode, 10s forward/rewind).
  - Mock video URL / responsive iframe embed support.
- [ ] Article/Text Viewport:
  - Clean typography markdown reader for text lessons.
  - Estimated reading time indicator.
- [ ] *Verification*: Video aur text dono types ke content seamlessly switch hokar play/render hon.

#### [ ] Day 13: Secure Asset Delivery Engine
- [ ] Content gating endpoint: `GET /api/courses/:courseId/lessons/:lessonId/content`.
- [ ] Non-enrolled users ke liye video URLs redact/hide karna (`isFreePreview` lessons chhodkar).
- [ ] Enrolled students ke liye time-limited signed tokens / obfuscated stream links generate karna.
- [ ] *Verification*: Network tab mein direct video URL bina enrollment token ke na dikhe.

#### [ ] Day 14: Linear Progression State Machine & `ProgressService`
- [ ] `models/Progress.js` schema banana:
  - `studentId`, `courseId`, `completedLessons` (`[{ lessonId, completedAt }]`), `currentLessonId`, `percentage`, `isCompleted`.
- [ ] Backend `ProgressService` linear state logic:
  - Strict prerequisite check: Lesson `n` tabhi complete mark ho sakti hai jab pehle ki lessons completed hon.
  - Atomic `$addToSet` update (duplicate counts prevent karne ke liye).
  - Automatic recalculation: `percentage = (completedLessons.length / totalLessonsInCourse) * 100`.
- [ ] Endpoint: `POST /api/progress/complete-lesson`.
- [ ] *Verification*: Prerequisite lessons skip karke complete API call karne par validation error aana chahiye.

#### [ ] Day 15: Classroom Auto-Resume & Real-Time Sync (< 200ms)
- [ ] Auto-resume logic: Course open karte hi student last incomplete lesson par automatically redirect ho.
- [ ] Client-side optimistic UI updates: Checkmark instantly tick ho aur background mein API sync ho.
- [ ] Progress update endpoint latency benchmark: < 150ms confirm karna.
- [ ] Git commit milestone tag `v0.3.0-learning-environment`.

---

### 🔹 PHASE 4: Evaluation Engine, Certification & System Hardening

#### [ ] Day 16: Quiz Engine Architecture & Schema
- [ ] Lesson subdocument mein `Quiz` schema integrate karna:
  - `questions: [{ questionText, options: [string], correctOptionIndex, explanation }]`
  - `passingScorePercentage` (e.g. 80%), `maxAttemptsAllowed`.
- [ ] `models/QuizSubmission.js` schema banana (student answers, score, passed, attemptNumber).
- [ ] Instructor Curriculum Builder mein Quiz creation modal create karna.
- [ ] *Verification*: Instructor multiple questions aur correct option save kar sake.

#### [ ] Day 17: Interactive Student Quiz Experience
- [ ] Classroom Viewport mein Quiz Interface:
  - Question stepper with radio buttons.
  - Submit button triggering server-side evaluation (correct answers client par leak nahi hote).
  - Results card: Score percentage, Pass/Fail badge, explanation review for wrong questions.
- [ ] Pass hone par automatically `ProgressService` trigger hokar next lesson unlock karega.
- [ ] *Verification*: 80% se kam score par fail ho aur next lesson locked rahe; pass hone par unlock ho.

#### [ ] Day 18: Certificate of Completion Generator
- [ ] Certificate Engine:
  - Jab `percentage === 100%`, system automatically immutable `Certificate` record create kare with unique `certificateId` (UUID/Hash).
- [ ] Certificate Viewer UI:
  - Elegant printable/downloadable certificate design with student name, course title, completion date, and verification hash.
  - Print CSS aur PDF download trigger.
- [ ] *Verification*: 100% progress hit karte hi "Claim Certificate" button active ho aur certificate render ho.

#### [ ] Day 19: Global Exception Handling & Error Boundaries
- [ ] React Error Boundaries add karna classroom aur video viewport ke around.
- [ ] Backend Global Error Handler:
  - Mongoose validation errors, cast errors, duplicate key error (11000), JWT expiry clean handle karna.
- [ ] Input sanitization (`xss-clean` / DOMPurify) and rate limiting configure karna.
- [ ] *Verification*: Malformed IDs aur invalid inputs bhejne par server crash na ho, clean error response de.

#### [ ] Day 20: Performance Audit & Core 20-Day Baseline Milestone
- [ ] Load & latency testing on key endpoints:
  - `GET /api/courses/:slug`
  - `POST /api/progress/complete-lesson`
  - `GET /api/enrollments/my-courses`
- [ ] Ensure all target endpoints resolve in **< 200ms**.
- [ ] Realistic multi-chapter sample course data seed karna.
- [ ] Git release candidate tag `v1.0.0-core-release`.

---

### 🔹 PHASE 5: Advanced 10-Day Industry Extensions (Extra Polish)

#### [ ] Day 21: Lesson-Specific Q&A Discussion Forum
- [ ] Schema `DiscussionThread` (`courseId`, `lessonId`, `studentId`, `title`, `content`, `videoTimestamp`, `upvotes`).
- [ ] Slide-over Q&A drawer beside video player with timestamped questions (*"At 02:45, what does this mean?"*).
- [ ] Threaded replies and instructor verified answer badges.

#### [ ] Day 22: Timestamped Private Notes & Export
- [ ] Schema `StudentNote` (`studentId`, `courseId`, `lessonId`, `videoTimestamp`, `noteContent`).
- [ ] "Take Note" button in classroom: freezes video timestamp and saves markdown note.
- [ ] Note click karne par video directly us recorded timestamp par seek ho.
- [ ] "Export Notes as PDF / Markdown" feature.

#### [ ] Day 23: Announcements & Real-Time Notification Bell
- [ ] Schema `Announcement` (instructor broadcast message to all enrolled students).
- [ ] Notification Bell dropdown in navbar (quiz results, certificate earned, course updates).
- [ ] Unread count badge and mark-as-read toggle.

#### [ ] Day 24: Instructor Drop-off Funnel Heatmaps & Quiz Analytics
- [ ] Visual drop-off funnel chart showing chapter-by-chapter student retention.
- [ ] Quiz Difficulty Index: Analytics highlighting questions with failure rates > 50%.
- [ ] Student average time-spent analytics.

#### [ ] Day 25: Public Verifiable Certificate Verification Portal
- [ ] Public route: `/verify-certificate/:certificateId` (bina login ke accessible).
- [ ] QR code generator linking directly to verification URL.
- [ ] OpenGraph preview card for LinkedIn/Twitter sharing.

#### [ ] Day 26: Full-Text Instant Search & Multi-Filters
- [ ] MongoDB full-text index on `{ title: "text", description: "text", tags: "text" }`.
- [ ] Debounced search bar with live autocomplete suggestions.
- [ ] Multi-faceted filter sidebar: Category, Difficulty (`Beginner` to `Advanced`), Duration, Price.

#### [ ] Day 27: Course Ratings, Reviews & Social Proof
- [ ] Schema `Review` (rating 1-5, headline, reviewText).
- [ ] Eligibility rule: Student must complete at least 25% of the course to submit a review.
- [ ] Weighted course rating calculation and verified learner badges.

#### [ ] Day 28: Dark Mode, Classroom Keyboard Shortcuts & Accessibility
- [ ] System-aware Dark / Light mode toggle with local storage persistence.
- [ ] Video classroom shortcuts: `Space`=Play/Pause, `J`/`L`=Seek 10s, `M`=Mute, `N`=Next Lesson.
- [ ] WCAG 2.1 AA color contrast and screen reader accessibility audit.

#### [ ] Day 29: Redis Caching Layer (< 100ms Latency SLA)
- [ ] Redis / in-memory cache for course catalog and metadata queries.
- [ ] Automatic cache invalidation when instructors update or publish courses.
- [ ] Gzip / Brotli compression middleware.
- [ ] Cached API response times reduced to **40ms – 90ms**.

#### [ ] Day 30: End-to-End Automation & Production Dockerization
- [ ] Automated E2E test suite (Playwright/Cypress) for full student and instructor journeys.
- [ ] Multi-stage `Dockerfile` (frontend + backend) and `docker-compose.yml` (API, Client, MongoDB, Redis).
- [ ] Final deployment guide, API documentation, and Git release tag `v2.0.0-master-release`.

---
*Created for Axlero Digital Transformation LMS — Track progress by ticking `[x]` as you complete each day.*
