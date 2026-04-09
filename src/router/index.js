import React from "react";

import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import CheckoutSuccess from "screens/CheckoutSuccess";
import CreatePassword from "screens/Authentication/CreatePassword";
import Forgot from "screens/Authentication/Forgot";
import Login from "screens/Authentication/Login";
import Register from "screens/Authentication/Register";
import Landpage from "screens/Landpage";
import NotFound from "screens/NotFound";
import DashboardBatchPrint from "screens/Dashboard/BatchPrint";
import DashboardCreateItem from "screens/Dashboard/CreateItem";
import DashboardCreatePrice from "screens/Dashboard/CreatePrice";
import DashboardHistory from "screens/Dashboard/History";
import DashboardHome from "screens/Dashboard/Home";
import DashboardImport from "screens/Dashboard/Import";
import DashboardItems from "screens/Dashboard/Items";
import DashboardLabels from "screens/Dashboard/Labels";
import DashboardMe from "screens/Dashboard/Me";
import DashboardMePassword from "screens/Dashboard/MePassword";
import DashboardPDVIntegration from "screens/Dashboard/PDVIntegration";
import DashboardPromotions from "screens/Dashboard/Promotions";
import DashboardQuickPrice from "screens/Dashboard/QuickPrice";
import DashboardReports from "screens/Dashboard/Reports";
import DashboardSettings from "screens/Dashboard/Settings";
import DashboardSupport from "screens/Dashboard/Support";
import DashboardSupportAccess from "screens/Dashboard/SupportAccess";
import DashboardSupportForm from "screens/Dashboard/SupportForm";
import { ROUTE_KEYS, resolveRouteAccess } from "services/access";
import { ReadObject } from "services/storage";
import { hasAuthenticatedSession } from "services/authentication";

function GuardedElement({ routeKey, element }) {
    const authentication = ReadObject("authentication") || {};
    const user = ReadObject("user") || {};
    const access = resolveRouteAccess(routeKey, user, hasAuthenticatedSession(authentication));

    if (access.redirectTo) {
        return <Navigate replace to={access.redirectTo} />;
    }

    if (access.notFound) {
        return <NotFound />;
    }

    return element;
}

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GuardedElement routeKey={ROUTE_KEYS.landing} element={<Landpage />} />} />
                <Route
                    path="/checkout/success"
                    element={<GuardedElement routeKey={ROUTE_KEYS.checkoutSuccess} element={<CheckoutSuccess />} />}
                />

                <Route path="/login" element={<GuardedElement routeKey={ROUTE_KEYS.login} element={<Login />} />} />
                <Route path="/register" element={<GuardedElement routeKey={ROUTE_KEYS.register} element={<Register />} />} />
                <Route path="/forgot" element={<GuardedElement routeKey={ROUTE_KEYS.forgot} element={<Forgot />} />} />
                <Route
                    path="/create-password"
                    element={<GuardedElement routeKey={ROUTE_KEYS.createPassword} element={<CreatePassword />} />}
                />

                <Route
                    path="/dashboard"
                    element={<GuardedElement routeKey={ROUTE_KEYS.dashboardHome} element={<DashboardHome />} />}
                />
                <Route
                    path="/dashboard/prices/create"
                    element={<GuardedElement routeKey={ROUTE_KEYS.createPrice} element={<DashboardCreatePrice />} />}
                />
                <Route
                    path="/dashboard/prices/quick"
                    element={<GuardedElement routeKey={ROUTE_KEYS.quickPrice} element={<DashboardQuickPrice />} />}
                />
                <Route
                    path="/dashboard/prices/batch"
                    element={<GuardedElement routeKey={ROUTE_KEYS.batchPrint} element={<DashboardBatchPrint />} />}
                />
                <Route
                    path="/dashboard/history"
                    element={<GuardedElement routeKey={ROUTE_KEYS.history} element={<DashboardHistory />} />}
                />
                <Route
                    path="/dashboard/promotions"
                    element={<GuardedElement routeKey={ROUTE_KEYS.promotions} element={<DashboardPromotions />} />}
                />
                <Route
                    path="/dashboard/labels"
                    element={<GuardedElement routeKey={ROUTE_KEYS.labels} element={<DashboardLabels />} />}
                />
                <Route
                    path="/dashboard/integration"
                    element={<GuardedElement routeKey={ROUTE_KEYS.pdvIntegration} element={<DashboardPDVIntegration />} />}
                />
                <Route
                    path="/dashboard/reports"
                    element={<GuardedElement routeKey={ROUTE_KEYS.reports} element={<DashboardReports />} />}
                />
                <Route
                    path="/dashboard/settings"
                    element={<GuardedElement routeKey={ROUTE_KEYS.settings} element={<DashboardSettings />} />}
                />
                <Route
                    path="/dashboard/items/create"
                    element={<GuardedElement routeKey={ROUTE_KEYS.createItem} element={<DashboardCreateItem />} />}
                />
                <Route
                    path="/dashboard/items/import"
                    element={<GuardedElement routeKey={ROUTE_KEYS.importItems} element={<DashboardImport />} />}
                />
                <Route
                    path="/dashboard/items"
                    element={<GuardedElement routeKey={ROUTE_KEYS.items} element={<DashboardItems />} />}
                />
                <Route
                    path="/dashboard/me"
                    element={<GuardedElement routeKey={ROUTE_KEYS.me} element={<DashboardMe />} />}
                />
                <Route
                    path="/dashboard/me/password"
                    element={<GuardedElement routeKey={ROUTE_KEYS.mePassword} element={<DashboardMePassword />} />}
                />

                <Route
                    path="/dashboard/support"
                    element={<GuardedElement routeKey={ROUTE_KEYS.support} element={<DashboardSupport />} />}
                />
                <Route
                    path="/dashboard/support/access"
                    element={<GuardedElement routeKey={ROUTE_KEYS.supportAccess} element={<DashboardSupportAccess />} />}
                />
                <Route
                    path="/dashboard/support/create"
                    element={<GuardedElement routeKey={ROUTE_KEYS.supportForm} element={<DashboardSupportForm />} />}
                />
                <Route
                    path="/dashboard/support/create/:id"
                    element={<GuardedElement routeKey={ROUTE_KEYS.supportForm} element={<DashboardSupportForm />} />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
