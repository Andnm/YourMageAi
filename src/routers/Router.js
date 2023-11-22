import React from "react";
import { Routes, Route } from "react-router-dom";

import Introduction from "../pages/Introduction";

import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import CommunityFeed from "../pages/CommunityFeed";
import AiGenerations from "../pages/AiGenerations";
import ChatAi from "../pages/ChatAi";
import Settings from "../pages/Settings";
import UpgradeLevel from "../pages/UpgradeLevel"
import Payment from "../pages/Payment";
import PersonalFeed from '../pages/PersonalFeed'

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminTransaction from "../pages/AdminTransaction";
import AdminManageUser from "../pages/AdminManageUser";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />

      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai-generations" element={<AiGenerations />} />
        <Route path="/community-feed" element={<CommunityFeed />} />
        <Route path="/personal-feed" element={<PersonalFeed />} />
        <Route path="/chat-ai" element={<ChatAi />} />
      </Route>

      <Route path="/upgrade-level" element={<UpgradeLevel />} />
      <Route path="/payment" element={<Payment />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-user" element={<AdminManageUser />} />
        <Route path="/admin-transaction" element={<AdminTransaction />} />
      </Route>

    </Routes>
  )
};

export default Router;
