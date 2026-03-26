import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "./components/layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PricingPage } from "./pages/PricingPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { LegalPage } from "./pages/LegalPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";

import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminEnquiriesPage } from "./pages/admin/AdminEnquiriesPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminServicesPage } from "./pages/admin/AdminServicesPage";
import { AdminBlogPage } from "./pages/admin/AdminBlogPage";

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/track" element={<TrackOrderPage />} />
        <Route path="/legal/:type" element={<LegalPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="enquiries" element={<AdminEnquiriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="projects" element={<AdminProjectsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
}

