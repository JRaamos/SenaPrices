import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landpage from 'screens/Landpage' 
import NotFound from 'screens/NotFound' 

import Login from 'screens/Authentication/Login' 
import Register from 'screens/Authentication/Register' 
import Forgot from 'screens/Authentication/Forgot' 
import CreatePassword from 'screens/Authentication/CreatePassword' 

import DashboardHome from 'screens/Dashboard/Home' 
import DashboardCreatePrice from "screens/Dashboard/CreatePrice";
import DashboardCreateItem from "screens/Dashboard/CreateItem";
import DashboardImport from "screens/Dashboard/Import";
import DashboardItems from "screens/Dashboard/Items";
import DashboardQuickPrice from "screens/Dashboard/QuickPrice";
import DashboardMe from 'screens/Dashboard/Me' 
import DashboardSupport from "screens/Dashboard/Support";
import DashboardSupportForm from "screens/Dashboard/SupportForm";
import DashboardMePassword from "screens/Dashboard/MePassword";

export default function AppRouter() {
    return (
      <Router>  
        <div>
          <Routes>
            <Route path="/" exact element={<Landpage />} /> 
            
            <Route path="/login" exact element={<Login />} /> 
            <Route path="/register" exact element={<Register />} /> 
            <Route path="/forgot" exact element={<Forgot />} /> 
            <Route path="/create-password" exact element={<CreatePassword />} /> 
            
            <Route path="/dashboard" exact element={<DashboardHome />} /> 
            <Route path="/dashboard/prices/create" exact element={<DashboardCreatePrice />} />
            <Route path="/dashboard/prices/quick" exact element={<DashboardQuickPrice />} />
            <Route path="/dashboard/items/create" exact element={<DashboardCreateItem />} />
            <Route path="/dashboard/items/import" exact element={<DashboardImport />} />
            <Route path="/dashboard/items" exact element={<DashboardItems />} />
            <Route path="/dashboard/me" exact element={<DashboardMe />} /> 
            <Route path="/dashboard/me/password" exact element={<DashboardMePassword />} /> 

            <Route path="/dashboard/support" exact element={<DashboardSupport />} /> 
            <Route path="/dashboard/support/create" exact element={<DashboardSupportForm />} /> 
            <Route path="/dashboard/support/create/:id" exact element={<DashboardSupportForm />} /> 
            
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
}
