import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
        {
          path: 'user-managment',
          loadComponent: () => import('./views/pages/user-managment/user-managment.component').then(m => m.UserManagmentComponent),
          data: {
            title: 'User Managment Page'
          }
        },
        {
          path: 'shop-managment',
          loadComponent: () => import('./views/pages/shop-managment/shop-managment.component').then(m => m.ShopManagmentComponent),
          data: {
            title: 'Shop Managment Page'
          }
        },
        {
          path: 'category-managment',
          loadComponent: () => import('./features/categories/pages/category-list.component').then(m => m.CategoryListComponent),
          data: {
            title: 'Category Managment Page'
          }
        },
        {
          path: 'product-managment',
          loadComponent: () => import('./features/products/pages/product-list.component').then(m => m.ProductListComponent),
          data: {
            title: 'Product Managment Page'
          }
        },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'register-shop',
    loadComponent: () => import('./views/pages/register-shop/register-shop.component').then(m => m.RegisterShopComponent),
    data: {
      title: 'Register Shop Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
