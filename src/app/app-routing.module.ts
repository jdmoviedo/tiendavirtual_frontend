import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { PrivateComponent } from './private/layout/layout.component';
import { LoginComponent } from './public/login/login.component';
import { UsuariosComponent } from './private/usuarios/usuarios.component';
import { PublicComponent } from './public/layout/layout.component';
import { RegisterComponent } from './public/register/register.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { IngresosComponent } from './private/ingresos/ingresos.component';
import { EgresosComponent } from './private/egresos/egresos.component';
import { ProductosComponent } from './private/productos/productos.component';
import { CategoriasComponent } from './private/categorias/categorias.component';
import { AuthGuard } from './public/auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: PrivateComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      {
        path: 'ingresos',
        component: IngresosComponent,
      },
      {
        path: 'egresos',
        component: EgresosComponent,
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
