import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomeOne from '../views/HomeOne.vue';
import MapOne from '../views/MapOne.vue'

import HomePage from '../views/HomePage.vue'
import MainView from '../views/MainView.vue'
import NSMapConsoleView from '../views/NSMapConsoleView.vue'
import LSMapConsoleView from '../views/LSMapConsoleView.vue'
import TWMapConsoleView from '../views/TWMapConsoleView.vue'
import GenerateReport from '../components/generateReport.vue';

import AboutView from '../views/AboutView.vue';
import FeedbackView from '../views/FeedbackView.vue';
import ContactView from '../views/ContactView.vue';
import PdfGenerator from '../components/PdfGenerator.vue';

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/main',
    name: 'Main',
    component: MainView
  },
  {
    path: '/namsaimapconsole',
    name: 'NSMapConsole',
    component: NSMapConsoleView
  },
  {
    path: '/lsmapconsole',
    name: 'LSMapConsole',
    component: LSMapConsoleView
  },
  {
    path: '/twmapconsole',
    name: 'TWMapConsole',
    component: TWMapConsoleView
  },
  {
  path:'/generatereport',
  name:'generateReport',
  component:PdfGenerator
},
{
  path:'/about',
  name:'About',
  component: AboutView
},
{
  path:'/feedback',
  name:'Feedback',
  component:FeedbackView
},
{
  path:'/contact',
  name:'contact',
  component:ContactView
},
  // {
  //   path: '/',
  //   redirect: '/mapone'
  // },
  {
    path: '/homeone',
    name: 'HomeOne',
    component: HomeOne
  },
  {
    path: '/mapone',
    name: 'MapOne',
    component: MapOne
  },
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
