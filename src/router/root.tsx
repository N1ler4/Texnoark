import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CategoryIcon from '@mui/icons-material/Category';

interface Route  {
  path: string,
  content: string,
  icon: React.ReactElement
}

const router : Route[] = [
  {
    path: "/main",
    content: "Categories",
    icon: <HomeIcon/>
  },
  {
    path: "/main/brands",
    content: "Brands",
    icon: <LocalOfferIcon/>
  },
  {
    path: "/main/product",
    content: "Product",
    icon: <CategoryIcon/>
  },
  {
    path: "/main/settings",
    content: "Settings",
    icon: <SettingsSuggestIcon/>
  },
];

export default router;
