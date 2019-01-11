import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './containers/book-list/book-list.component';
import { BookDetailsComponent } from './containers/book-details/book-details.component';
import { FavBookListComponent } from './containers/fav-book-list/fav-book-list.component';

const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'favBooks', component: FavBookListComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', redirectTo: '/books', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
