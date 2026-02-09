import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'register-shop',
    loadComponent: () => import('./register-shop/register-shop.component').then(m => m.RegisterShopComponent),
    data: {
      title: 'Register Shop Page'
    }
  },
  {
    path: 'user-managment',
    loadComponent: () => import('./user-managment/user-managment.component').then(m => m.UserManagmentComponent),
    data: {
      title: 'User Managment Page'
    }
  },
  {
    path: 'shop-managment',
    loadComponent: () => import('./shop-managment/shop-managment.component').then(m => m.ShopManagmentComponent),
    data: {
      title: 'Shop Managment Page'
    }
  },
  {
    path: 'shop-profile',
    loadComponent: () => import('./shop-profile/shop-profile.component').then(m => m.ShopProfileComponent),
    data: {
      title: 'Shop Profile Page'
    }
  }
];
