import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Pages Calendar

// Pages Component

//Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/jquery-knob";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";

//Icons
import RemixIcons from "../pages/Icons/RemixIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign";
import DripiIcons from "../pages/Icons/DripiIcons";
import FontAwesome from "../pages/Icons/FontAwesome";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Timeline from "../pages/Utility/Timeline";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

import Admin from "./../../src/pages/UserManagement/Admin";
import theme from "../pages/Theme/theme";
import SupportPage from "../pages/Ui/Support/SupportMainpage";
import ChangePassword from "../pages/Authentication/ChangePassword";
import CreateAuditor from "../pages/UserManagement/Auditor/CreateAuditor";
import EmployeeList from "../pages/UserManagement/Employee_Supervisor/EmployeeList";
import CreateEmployee from "../pages/UserManagement/Employee_Supervisor/CreateEmployee";

import AdminList from "../pages/UserManagement/Admin/AdminList";
import CreateAdmin from "../pages/UserManagement/Admin/CreateAdmin";
import ChangeProfile from "../pages/Authentication/ChangeProfile";
import PermissionManagementList from "../pages/master/permitionmanagement/PermissionManagementList";
import ExpenseList from "../pages/master/expensemanagement/ExpenseList";
import CreateExpense from "../pages/master/expensemanagement/CreateExpense";
import PropertyTypeList from "../pages/master/propertytype/PropertyTypeList";
import CreatePropertyType from "../pages/master/propertytype/CreatePropertyType";
import Permission from "../pages/master/permitionmanagement/Permisson";
import PropertyMasterList from "../pages/propertymaster/PropertyMasterList";
import CreateProperty from "../pages/propertymaster/CreateProperty";
import UnitList from "../pages/propertymaster/UnitList";

import WorkerList from "../pages/master/workermanagement/WorkerList";
import CreateWorker from "../pages/master/workermanagement/CreateWorker";
import SupervisorList from "../pages/UserManagement/Employee_Supervisor/SupervisorList";
import Auditor from "../pages/UserManagement/Auditor/Auditor";
import CreateSupervisor from "../pages/UserManagement/Employee_Supervisor/CreateSupervisor";
import DepartmentList from "../pages/Department/DepartmentList";
import CreateDepartment from "../pages/Department/CreateDepartment";
import DesignationtList from "../pages/Designation/DesignationtList";
import CreateDesignation from "../pages/Designation/CreateDesignation";
import ProcessList from "../pages/Process/ProcessList";
import CreateProcess from "../pages/Process/CreateProcess";
import PermissionPage from "../pages/RolePermission/PermissionPage";
import BaseMakeList from "../pages/BaseMake/BaseMakeList";
import CreateMakeList from "../pages/BaseMake/BaseMakeList";
import CreateMake from "../pages/BaseMake/CreateMake";
import BaseModalMasterList from "../pages/BaseModalMaster/BaseModalMasterList";
import BaseTypeMasterList from "../pages/BaseTypeMaster/BaseTypeMasterList";
import CreateModal from "../pages/BaseModalMaster/CreateModal";
import CreateType from "../pages/BaseTypeMaster/CreateType";
import FiltrationMakeList from "../pages/FiltrationMake/FiltrationMakeList";
import CreateFiltrationMake from "../pages/FiltrationMake/CreateFiltrationMake";
import HumidificationMakeList from "../pages/HumidificationMake/HumidificationMakeList";
import CreateHumidificationMake from "../pages/HumidificationMake/CreateHumidificationMake";
import PneumaticMakeList from "../pages/Pneumatic Make/PneumaticMakeList";
import CreatePneumaticMake from "../pages/Pneumatic Make/CreatePneumaticMake";
import ProcessLineList from "../pages/ProcessLine/ProcessLineList";
import CreateProcessLine from "../pages/ProcessLine/CreateProcessLine";
import ProductionEnduseList from "../pages/ProductionEnduse/ProductionEnduseList";
import CreateProductionEnduse from "../pages/ProductionEnduse/CreateProductionEnduse";

const PATH = process.env.PUBLIC_URL;
const authProtectedRoutes = [
  /*
  // Tables
  { path: "/basic-tables", component: BasicTables },
  { path: "/datatable-table", component: DatatableTables },
  { path: "/responsive-table", component: ResponsiveTables },
  { path: "/editable-table", component: EditableTables },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-roundslider", component: UIRoundSlider },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-file-upload", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  //Utility
  { path: "/starter", component: StarterPage },
  { path: "/timeline", component: Timeline },
  { path: "/faqs", component: FAQs },
  { path: "/pricing", component: Pricing },

  //Icons
  { path: "/icons-remix", component: RemixIcons },
  { path: "/material-design", component: MaterialDesign },
  { path: "/dripicons", component: DripiIcons },
  { path: "/font-awesome-5", component: FontAwesome },

  // Maps
  { path: "/google-maps", component: MapsGoogle },
  { path: "/vector-maps", component: MapsVector },

  //Charts
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartjs", component: ChartjsChart },
  { path: "/charts-sparkline", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },

  //Email
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },

  //Ecommerce

  { path: "/ecommerce-products", component: EcommerceProducts },
  { path: "/ecommerce-product-detail/:id", component: EcommerceProductDetail },
  { path: "/ecommerce-orders", component: EcommerceOrders },
  { path: "/ecommerce-customers", component: EcommerceCustomers },
  { path: "/ecommerce-cart", component: EcommerceCart },
  { path: "/ecommerce-checkout", component: EcommerceCheckout },
  { path: "/ecommerce-shops", component: EcommerceShops },
  { path: "/ecommerce-add-product", component: EcommerceAddProduct },

  //chat
  { path: "/chat", component: Chat },

  //calendar
  { path: "/calendar", component: Calendar },

  

  //Practice
 { path: "/practice", component: Practice },
*/

  { path: PATH + "/dashboard", component: Dashboard },

  { path: PATH + "/theme", component: theme },
  // { path: "/Admin", component: Admin },
  { path: PATH + "/rolelist", component: Admin },

  { path: PATH + "/edit-permission/:id", component: Permission },

  //Worker
  { path: PATH + "/worker-list", component: WorkerList },
  { path: PATH + "/create-worker", component: CreateWorker },
  { path: PATH + "/edit-worker/:id", component: CreateWorker },

  // Support Page
  { path: PATH + "/support", component: SupportPage },
  // MASTER
  // Permission management Page
  { path: PATH + "/permission-list", component: PermissionManagementList },

  { path: PATH + "/expense-list", component: ExpenseList },
  { path: PATH + "/create-expanse", component: CreateExpense },
  { path: PATH + "/edit-expanse/:id", component: CreateExpense },

  { path: PATH + "/property-type-list", component: PropertyTypeList },
  { path: PATH + "/create-property-type", component: CreatePropertyType },
  { path: PATH + "/edit-property-type/:id", component: CreatePropertyType },
  // this route should be at the end of all other routes

  // Auth Inner
  { path: PATH + "/change-password", component: ChangePassword },
  { path: PATH + "/change-profile", component: ChangeProfile },
  // TENANT USER
  { path: PATH + "/admin", component: AdminList },
  { path: PATH + "/create-admin", component: CreateAdmin },
  { path: PATH + "/edit-admin/:id", component: CreateAdmin },
  { path: PATH + "/auditor", component: Auditor },
  { path: PATH + "/create-auditor", component: CreateAuditor },
  { path: PATH + "/edit-auditor/:id", component: CreateAuditor },
  { path: PATH + "/employee-list", component: EmployeeList },
  { path: PATH + "/create-employee", component: CreateEmployee },
  { path: PATH + "/edit-employee/:id", component: CreateEmployee },
  { path: PATH + "/supervisor-list", component: SupervisorList },
  { path: PATH + "/create-supervisor", component: CreateSupervisor },
  { path: PATH + "/edit-supervisor/:id", component: CreateSupervisor },

  // Property Master
  { path: PATH + "/property-list", component: PropertyMasterList },
  { path: PATH + "/create-property", component: CreateProperty },
  { path: PATH + "/edit-property/:id", component: CreateProperty },
  { path: PATH + "/unit-list/:id", component: UnitList },

  //Department
  { path: PATH + "/department-list", component: DepartmentList },
  { path: PATH + "/create-department", component: CreateDepartment },
  { path: PATH + "/edit-department/:id", component: CreateDepartment },

  //Designation
  { path: PATH + "/designation-list", component: DesignationtList },
  { path: PATH + "/create-designation", component: CreateDesignation },
  { path: PATH + "/edit-designation/:id", component: CreateDesignation },

  //Process Master
  { path: PATH + "/process-list", component: ProcessList },
  { path: PATH + "/create-process", component: CreateProcess },
  { path: PATH + "/edit-process/:id", component: CreateProcess },

  //Permission
  { path: PATH + "/role-permission/:id", component: PermissionPage },

  //Process Line
  { path: PATH + "/process-line-list", component: ProcessLineList },
  { path: PATH + "/create-process-line", component: CreateProcessLine },
  { path: PATH + "/edit-process-line/:id", component: CreateProcessLine },

  //production-enduse
  { path: PATH + "/production-enduse-list", component: ProductionEnduseList },
  {
    path: PATH + "/create-production-enduse",
    component: CreateProductionEnduse,
  },
  {
    path: PATH + "/edit-production-enduse/:id",
    component: CreateProductionEnduse,
  },

  //install base make master
  { path: PATH + "/install-base-make", component: BaseMakeList },
  { path: PATH + "/create-install-base-make", component: CreateMake },
  { path: PATH + "/edit-install-base-make/:id", component: CreateMake },

  //install base modal master
  { path: PATH + "/install-base-modal", component: BaseModalMasterList },
  { path: PATH + "/create-install-base-modal", component: CreateModal },
  { path: PATH + "/edit-install-base-modal/:id", component: CreateModal },

  //install base type master
  { path: PATH + "/install-base-type", component: BaseTypeMasterList },
  { path: PATH + "/create-install-base-type", component: CreateType },
  { path: PATH + "/edit-install-base-type/:id", component: CreateType },

  //install filtration-make master
  { path: PATH + "/filtration-make", component: FiltrationMakeList },
  { path: PATH + "/create-filtration-make", component: CreateFiltrationMake },
  { path: PATH + "/edit-filtration-make/:id", component: CreateFiltrationMake },

  //install Humidification-make master
  { path: PATH + "/humidification-make", component: HumidificationMakeList },
  {
    path: PATH + "/create-humidification-make",
    component: CreateHumidificationMake,
  },
  {
    path: PATH + "/edit-humidification-make/:id",
    component: CreateHumidificationMake,
  },

  //install Pneumatic-make master
  { path: PATH + "/pneumatic-make", component: PneumaticMakeList },
  {
    path: PATH + "/create-pneumatic-make",
    component: CreatePneumaticMake,
  },
  {
    path: PATH + "/edit-pneumatic-make/:id",
    component: CreatePneumaticMake,
  },
  // Rentals Property Management

  //Maintenance

  //Report

  //calendar
  {
    path: "/",
    exact: true,
    component: () => <Redirect to={PATH + "/dashboard"} />,
  },
];

const publicRoutes = [
  { path: PATH + "/logout", component: Logout },
  { path: PATH + "/login", component: Login },
  { path: PATH + "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/lock-screen", component: AuthLockScreen },

  // Authentication Inner
  { path: "/auth-login", component: Login1 },
  { path: "/auth-register", component: Register1 },
  { path: "/auth-recoverpw", component: ForgetPwd1 },

  { path: "/maintenance", component: Maintenance },
  { path: "/comingsoon", component: CommingSoon },
  { path: "/404", component: Error404 },
  { path: "/500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
