import { RouteRecord } from 'vite-react-ssg';
import App from './App';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CalculatorsIndexPage } from './pages/CalculatorsIndexPage';
import { GuidePage } from './pages/GuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TOOLS_DATA } from './data/tools';
import { ARTICLES_DATA } from './data/articles';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'calculators',
        element: <CalculatorsIndexPage />,
      },
      {
        path: 'tools',
        element: <CalculatorsIndexPage />,
      },
      {
        path: 'tools/:slugOrId',
        element: <CalculatorPage />,
        getStaticPaths: () => TOOLS_DATA.map((tool) => `/tools/${tool.slug}`),
      },
      {
        path: 'calculators/:slugOrId',
        element: <CalculatorPage />,
        getStaticPaths: () => TOOLS_DATA.map((tool) => `/calculators/${tool.slug}`),
      },
      {
        path: 'calculator/:slugOrId',
        element: <CalculatorPage />,
        getStaticPaths: () => TOOLS_DATA.map((tool) => `/calculator/${tool.slug}`),
      },
      {
        path: 'guides/:slugOrId',
        element: <GuidePage />,
        getStaticPaths: () => ARTICLES_DATA.map((guide) => `/guides/${guide.slug || guide.id}`),
      },
      {
        path: 'articles/:slugOrId',
        element: <GuidePage />,
        getStaticPaths: () => ARTICLES_DATA.map((guide) => `/articles/${guide.slug || guide.id}`),
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'privacy',
        element: <LegalPage />,
      },
      {
        path: 'terms',
        element: <LegalPage />,
      },
      {
        path: 'disclaimer',
        element: <LegalPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
