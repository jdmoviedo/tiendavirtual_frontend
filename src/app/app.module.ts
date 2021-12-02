import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrivateComponent } from './private/layout/layout.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { UsuariosComponent } from './private/usuarios/usuarios.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { FooterComponent } from './private/layout/footer/footer.component';
import { SidebarComponent } from './private/layout/sidebar/sidebar.component';
import { TopbarComponent } from './private/layout/topbar/topbar.component';
import { PublicComponent } from './public/layout/layout.component';
import { EgresosComponent } from './private/egresos/egresos.component';
import { IngresosComponent } from './private/ingresos/ingresos.component';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './private/productos/productos.component';
import { CategoriasComponent } from './private/categorias/categorias.component';
import { AuthGuard } from './public/auth/auth.guard';
import { TokenInterceptorService } from './public/auth/token-interceptor.service';

export function playerFactory() {
  //return player;
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    DashboardComponent,
    UsuariosComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    PublicComponent,
    EgresosComponent,
    IngresosComponent,
    ProductosComponent,
    CategoriasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
  ],
  providers: [
    Title,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
