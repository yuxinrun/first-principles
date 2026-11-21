import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { TopicsPage } from './pages/TopicsPage'
import { TopicDetailPage } from './pages/TopicDetailPage'
import { CasesPage } from './pages/CasesPage'
import { CaseDetailPage } from './pages/CaseDetailPage'
import { PeoplePage } from './pages/PeoplePage'
import { PersonDetailPage } from './pages/PersonDetailPage'
import { BooksPage } from './pages/BooksPage'
import { BookDetailPage } from './pages/BookDetailPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { ArticleDetailPage } from './pages/ArticleDetailPage'
import { ToolsPage } from './pages/ToolsPage'
import { ProblemBreakdownPage } from './pages/tools/ProblemBreakdownPage'
import { AssumptionCheckPage } from './pages/tools/AssumptionCheckPage'
import { DecisionPage } from './pages/tools/DecisionPage'
import { CasePracticePage } from './pages/tools/CasePracticePage'
import { LearningPathPage } from './pages/LearningPathPage'
import { SearchPage } from './pages/SearchPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/foundations" element={<TopicDetailPage slug="foundations" />} />
        <Route path="/philosophy" element={<TopicDetailPage slug="philosophy" />} />
        <Route path="/logic" element={<TopicDetailPage slug="logic" />} />
        <Route path="/science" element={<TopicDetailPage slug="science" />} />
        <Route path="/engineering" element={<TopicDetailPage slug="engineering" />} />
        <Route path="/business" element={<TopicDetailPage slug="business" />} />
        <Route path="/life" element={<TopicDetailPage slug="life" />} />
        <Route path="/education" element={<TopicDetailPage slug="education" />} />
        <Route path="/society" element={<TopicDetailPage slug="society" />} />
        <Route path="/practice" element={<TopicDetailPage slug="practice" />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:slug" element={<CaseDetailPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PersonDetailPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:slug" element={<BookDetailPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/problem-breakdown" element={<ProblemBreakdownPage />} />
        <Route path="/tools/assumption-check" element={<AssumptionCheckPage />} />
        <Route path="/tools/decision" element={<DecisionPage />} />
        <Route path="/tools/case-practice" element={<CasePracticePage />} />
        <Route path="/learning-path" element={<LearningPathPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
