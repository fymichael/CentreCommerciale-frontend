import { INavData } from '@coreui/angular';

export const navItems: (INavData & { roles?: string[] })[] = [

  {
    name: 'Tableau de bord',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    roles: ['Admin mall', 'Admin shop'],
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'Paramétrages',
    roles: ['Admin mall']
  },

  {
    name: 'Utilisateurs',
    url: '/user-managment',
    iconComponent: { name: 'cil-user' },
    roles: ['Admin mall']
  },

  {
    name: 'Catégories',
    url: '/category-managment',
    iconComponent: { name: 'cil-tags' }, 
    roles: ['Admin mall']
  },

  {
    title: true,
    name: 'Espace Client',
    roles: ['Admin shop']
  },

  {
    name: 'Boutiques',
    url: '/shop-managment',
    iconComponent: { name: 'cil-home' },
    roles: ['Admin Shop']
  },

  {
    name: 'Profil de la boutique',
    url: '/shop-profile',
    iconComponent: { name: 'cil-home' },
    roles: ['Admin shop']
  },

  {
    name: 'Se deconnecter',
    url: '/log-out',
    iconComponent: { name: 'cilAccountLogout' },
    roles: ['Admin mall', 'Admin shop', 'Client']
  }
];