import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getPathLabel = (segment) => {
    const labels = {
      "entity-master": "Entity Master",
      "add-entity": "Add Entity",
      "edit-entity": "Edit Entity",
      "settings": "Settings",
      "Activity_Type_Setup":"Activity Type Setup",
      "User_permission":"User Permission",
      "Activity_Entity_Setup":"View Activity Entity"
    };
    return labels[segment] || segment;
  };

  return (
    <div >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize=".8rem" />}
      >
        {/* Home link */}
        <Link underline="hover" style={{fontSize:".8rem"}} color="inherit" component={RouterLink} to="/dashboard">
         Home
        </Link>

        {/* Map over each segment of the path */}
        {pathnames.map((value, index) => {
          const to = `Master/${pathnames.slice(0, index + 1).join('/')}`;

          // If it's the last item, display it as plain text (current page)
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="textPrimary" style={{fontSize:".8rem"}} key={to}>
              {getPathLabel(value)}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" component={RouterLink} to={to} key={to}>
              {getPathLabel(value)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
