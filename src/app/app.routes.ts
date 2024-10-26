import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    {
        path: '', component: SignUpComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signUp', component: SignUpComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'map', component: MapComponent
    }
];
