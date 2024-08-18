import { Routes } from "@angular/router";
import { FeaturesComponent } from "./features.component";
import { IsAdminGuard } from "../auth/authguard/authgardservice.service";

export const featureRoutes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            // {
            //     path: '',
            //     redirectTo: 'admin',
            //     pathMatch: 'full'
            // },
            {
                path: 'admin',
                loadChildren: () =>
                  import('./admin-module/admin-module.routes').then((r) => r.AdminModuleRoutes),
            },

 
        ]
    },
]