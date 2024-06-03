import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import GroupIcon from '@mui/icons-material/Group';

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
  // {
  //   path: "/main/users",
  //   content: "Users",
  //   icon: <GroupIcon/>
  // },
];

export default router;
