import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ClasseComponent } from './classe/classe.component';

const routes: Routes = [
  {path:'eleve', component:InscriptionComponent},
  {path:'classe',component:ClasseComponent},
  { path: '', redirectTo: 'eleve', pathMatch: 'full' },
  {  
    path: '**',redirectTo: 'eleve', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
