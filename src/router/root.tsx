import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from '@mui/icons-material/Inventory';

interface Route {
  path: string;
  content: string;
  icon: React.ReactElement;
}

const router: Route[] = [
  {
    path: "/main",
    content: "Categories",
    icon: <HomeIcon />,
  },
  {
    path: "/main/brands",
    content: "Brands",
    icon: <LocalOfferIcon />,
  },
  {
    path: "/main/product",
    content: "Product",
    icon: <CategoryIcon />,
  },
  {
    path: "/main/stock",
    content: "Stock",
    icon: <InventoryIcon />,
  },
  {
    path: "/main/settings",
    content: "Settings",
    icon: <SettingsSuggestIcon />,
  },
];

export default router;
