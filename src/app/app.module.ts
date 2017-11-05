import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Camera } from '@ionic-native/camera';

//Páginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutenticacaoPage } from '../pages/autenticacao/autenticacao';
import { CriarcontaPage } from '../pages/criarconta/criarconta';
import { LoginPage } from '../pages/login/login';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { ListadecomprasPage } from '../pages/listadecompras/listadecompras';
import { ListassalvasPage } from '../pages/listassalvas/listassalvas';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { PhotoProvider } from '../providers/photo/photo';


//Configurações do projeto no firebase
var config = {
    apiKey: "AIzaSyABJbPo5ljMw4frcrx1lqAck1g5vNOusUw",
    authDomain: "plusfinancas.firebaseapp.com",
    databaseURL: "https://plusfinancas.firebaseio.com",
    projectId: "plusfinancas",
    storageBucket: "plusfinancas.appspot.com",
    messagingSenderId: "65279366698"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AutenticacaoPage,
        CriarcontaPage,
        LoginPage,
        ResetpasswordPage,
        ListadecomprasPage,
        ListassalvasPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AutenticacaoPage,
        CriarcontaPage,
        LoginPage,
        ResetpasswordPage,
        ListadecomprasPage,
        ListassalvasPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Facebook,
        Geolocation,
        Camera,
        NativeGeocoder,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        PhotoProvider
    ]
})
export class AppModule {}
