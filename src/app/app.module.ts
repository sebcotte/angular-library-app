import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './containers/book-list/book-list.component';
import { BookDetailsComponent } from './containers/book-details/book-details.component';
import { FavBookListComponent } from './containers/fav-book-list/fav-book-list.component';
import { BookCardComponent } from './presentationals/book-card/book-card.component';
import { NavbarComponent } from './presentationals/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BookService } from './services/book.service';
import { FavBookService } from './services/fav-book.service';
import { environment } from 'src/environments/environment';
import { BookDetailsViewComponent } from './presentationals/book-details-view/book-details-view.component';
import { AlertComponent } from './containers/alert/alert.component';
import { AlertService } from './services/alert.service';
import { SearchService } from './services/search.service';
import { SearchComponent } from './presentationals/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookDetailsViewComponent,
    FavBookListComponent,
    BookCardComponent,
    NavbarComponent,
    AlertComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [SearchService, AlertService, AuthService, AuthGuardService, BookService, FavBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
