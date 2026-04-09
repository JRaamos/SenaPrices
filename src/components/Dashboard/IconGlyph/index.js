import React from "react";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const ICONS = {
    home: HomeOutlinedIcon,
    createPrice: LocalOfferOutlinedIcon,
    quickPrice: BoltOutlinedIcon,
    batchPrint: PrintOutlinedIcon,
    promotions: AssignmentTurnedInOutlinedIcon,
    history: HistoryOutlinedIcon,
    labels: ConfirmationNumberOutlinedIcon,
    createItem: AddBoxOutlinedIcon,
    items: Inventory2OutlinedIcon,
    import: UploadFileOutlinedIcon,
    reports: BarChartOutlinedIcon,
    integration: CableOutlinedIcon,
    settings: SettingsOutlinedIcon,
    supportAccess: AdminPanelSettingsOutlinedIcon,
    support: SupportAgentOutlinedIcon,
    account: PersonOutlineIcon,
    exit: LogoutOutlinedIcon,
    security: LockOutlinedIcon,
    master: WorkspacePremiumOutlinedIcon,
    landingDesktop: ComputerOutlinedIcon,
    landingWeb: PublicOutlinedIcon,
    landing: PublicOutlinedIcon,
    billing: RequestQuoteOutlinedIcon,
    print: TuneOutlinedIcon,
    users: PersonOutlineIcon,
    groups: GroupsOutlinedIcon,
    offerTypes: SellOutlinedIcon,
    specialOffers: AutoAwesomeOutlinedIcon,
    sections: CategoryOutlinedIcon,
    backgrounds: ImageOutlinedIcon,
    customPages: ArticleOutlinedIcon,
};

export default function DashboardIconGlyph({ name, size = 20, color = "currentColor" }) {
    const Component = ICONS[name] || ExtensionOutlinedIcon;

    return (
        <Component
            sx={{
                fontSize: size,
                color,
            }}
        />
    );
}
