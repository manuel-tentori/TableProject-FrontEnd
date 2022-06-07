import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }   from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { ProgettiComponent } from './progetti/progetti.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports:      [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule.forRoot(),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        MatInputModule,
        MatSnackBarModule,
        MatCheckboxModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        ProgettiComponent,
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
