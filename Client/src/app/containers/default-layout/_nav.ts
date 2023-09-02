import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Mon espace personnel',
    url: '/dashboard',
    iconComponent: { name: 'cilUser' }, 
    
  
  },
  {
    name: 'Mon espace profesionnel',
    url: '/login',
    iconComponent: { name: 'cilBriefcase' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
 
  
  {
    name: 'Mes demandes',
    url: '/forms/form-control',
    iconComponent: { name: 'cilColorBorder' },  

    //clickEvent: 'mesDemandesClick'
  },

  {
    name: 'Ma production horaire',
    url: '/charts',
    iconComponent: { name: 'cilAvTimer' }
  },


  {
    name: 'Ma plannification',
    url: '/table-form',
    iconComponent: { name: 'cil-calendar' },
  
  },

  {
    name: 'Mes informations personnelles',
    url: '/widgets',
    iconComponent: { name: 'cilContact' },
  
  },
 
  {
    name: 'Mon compte',
    url: '/forms',
    iconComponent: { name: 'cilCog' },
    // children: [
    //   {
    //     name: 'Form Control',
    //     url: '/forms/form-control'
    //   },
    //   {
    //     name: 'Select',
    //     url: '/forms/select'
    //   },
      
    // ]
  },
  
 
];
