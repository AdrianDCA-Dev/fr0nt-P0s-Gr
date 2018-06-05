import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'INICIO',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MENU DE NAVEGACION',
    group: true,
  },
  {
    title: 'PROGRAMA ACADEMICO',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Tipos de Posgrados',
        link: '/pages/admin/admin-type-academic-program',
      },
      {
        title: 'Programa',
        link: '/pages/admin/admin-academic-program',
      },
      {
        title: 'Cronograma',
        link: '/pages/admin/admin-cronograma',
      },
      /*{
        title: 'Modulos',
        link: '/pages/admin/admin-module',
      },
      {
        title: 'Contenido',
        link: '/pages/admin/admin-content',
      },*/
    ],
  },
  {
    title: 'USUARIOS',
    icon: 'nb-person',
    link: '/pages/admin/admin-users',
  },
  {
    title: 'INSCRIPCION',
    icon: 'nb-compose',
    link: '/pages/admin/admin-inscription',
  },
  {
    title: 'CRITERIO EVALUACION',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Academica',
        link: '/pages/admin/admin-evaluation-criteria',
      },
      {
        title: 'Administrativa',
        link: '/pages/admin/admin-campo-indicadores',
      },
    ],
  },
  {
    title: 'EVALUACIONES',
    icon: 'fa fa-clipboard',
    children: [
      {
        title: 'Administrativa Docente',
        link: '/pages/admin/admin-admin-teacher',
      },
      {
        title: 'Academica Docente',
        link: '/pages/admin/admin-teacher',
      },
      {
        title: 'Academica Estudiante',
        link: '/pages/admin/admin-student',
      },
    ],
  },
 /* {
    title: 'Carlosss',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },*/
];
