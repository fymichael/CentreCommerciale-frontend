import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LogoutComponent } from './component/logout.component';
import { ShopProfileComponent } from './views/pages/shop-profile/shop-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/dashboard/pages/dashboard.component').then(m => m.DashboardComponent),
        data: { 
          title: 'Dashboard',
          role: ['Admin mall', 'Admin shop'] 
        }
      }, {
        path: 'shop-profile',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/pages/shop-profile/shop-profile.component').then(m => m.ShopProfileComponent),
        data: {
          title: 'Shop Profile Page',
          role: ['Admin shop']
        }
      },
      {
        path: 'user-managment',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/users/pages/user-managment.component').then(m => m.UserManagmentComponent),
        data: {
          title: 'User Managment Page',
          role: ['Admin mall']
        }
      },
      {
        path: 'shop-managment',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/shops/pages/shop.component').then(m => m.ShopComponent),
        data: {
          title: 'Shop Managment Page',
          role: ['Admin mall']
        }
      },
      {
        path: 'category-managment',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/categories/pages/category-list.component').then(m => m.CategoryListComponent),
        data: {
          title: 'Category Managment Page',
          role: ['Admin mall']
        }
      },
      {
        path: 'product-managment',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/products/pages/product-list.component').then(m => m.ProductListComponent),
        data: {
          title: 'Product Managment Page',
          role: ['Admin shop']
        }
      },
      {
        path: 'subscription-shop',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/subscriptionShops/pages/subscription-shop.component').then(m => m.SubscriptionShopComponent),
        data: {
          title: 'Subscription Shop Page',
        role: ['Admin mall', 'Admin shop']
        }
      },
      { path: 'shop-profile/:id', component: ShopProfileComponent },
      {
        path: 'log-out',
        component: LogoutComponent
      }
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
    loadComponent: () => import('./features/login/pages/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./features/registers/pages/register.component').then(m => m.RegisterComponent),
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
  { path: '**', redirectTo: 'login' }
];