webpackJsonp([0],{

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 202:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 202;

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Foto */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//adicionar outras informações posteriormente
var Foto = (function () {
    function Foto() {
    }
    return Foto;
}());

var PhotoProvider = (function () {
    function PhotoProvider(alertCtrl, geolocation, db, toastCtrl, angFireAuth) {
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.angFireAuth = angFireAuth;
        try {
            this.lista_caminho = db.list('/caminho_das_imagens/');
        }
        catch (error) {
            console.log(error);
        }
        this.foto = new Foto;
    }
    PhotoProvider.prototype.uploadPhoto1 = function (captureDataUrl) {
        var _this = this;
        /*BEGIN_Pegar local da foto*/
        this.geolocation.getCurrentPosition().then(function (resp) {
            //Coordenadas da foto....
            _this.foto.latitude = resp.coords.latitude;
            _this.foto.longitude = resp.coords.longitude;
        }).catch(function (error) {
            _this.toastCtrl.create({
                message: error,
                duration: 3000
            }).present();
            //console.log('Error getting location', error);
        });
        /*END_Pegar local da foto*/
        /*BEGIN_Aqui realmente se faz o upload da foto*/
        var storageRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage().ref('/Users/');
        var filename = Math.floor(Date.now() / 1000);
        var uploadTask = storageRef.child(filename + ".jpg");
        uploadTask.putString(captureDataUrl, __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage.StringFormat.DATA_URL)
            .then(function (snapshot) {
            //código da foto: um número aleatório
            _this.foto.cod = filename.toString();
            //caminho da foto: caminho que está armezenado dentro do firebase
            _this.foto.url = snapshot.downloadURL;
            //Armazenando o caminho da foto
            _this.lista_caminho.push(_this.foto);
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            _this.toastCtrl.create({
                message: progress.toString() + '% done',
                showCloseButton: true
            }).present();
            _this.foto = new Foto;
        })
            .catch(function (erro) {
            _this.toastCtrl.create({
                message: erro.message,
                showCloseButton: true
            }).present();
        });
        /*END_Aqui realmente se faz o upload da foto*/
    };
    PhotoProvider.prototype.uploadPhoto = function (captureDataUrl) {
        /*BEGIN_Alerta para fornecer uma descrição para a promoção*/
        var _this = this;
        this.alertCtrl.create({
            title: 'Digite um título pra sua compra',
            inputs: [{
                    name: 'nome_promo',
                    placeholder: 'Título'
                }],
            buttons: [{
                    text: 'Cancelar',
                    handler: function (data) {
                        _this.foto.nome = 'Sem título';
                        _this.uploadPhoto1(captureDataUrl);
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        console.log('Save clicked');
                        _this.foto.nome = data.nome_promo;
                        _this.uploadPhoto1(captureDataUrl);
                    }
                }]
        }).present();
        /*END_Alerta para fornecer uma descrição para a promoção*/
    };
    return PhotoProvider;
}());
PhotoProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
], PhotoProvider);

//# sourceMappingURL=photo.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarcontaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_user__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CriarcontaPage = (function () {
    function CriarcontaPage(navCtrl, toastCtrl, authService) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__providers_auth_user__["a" /* User */]();
    }
    CriarcontaPage.prototype.criarConta = function () {
        var _this = this;
        if (this.form.form.valid) {
            var toast_1 = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
            this.authService.createUser(this.user)
                .then(function (user) {
                console.log("Usuário autenticado");
                user.sendEmailVerification();
                toast_1.setMessage('Usuário criado com sucesso.');
                toast_1.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            })
                .catch(function (error) {
                console.log("Erro: ", error.code);
                if (error.code == 'auth/email-already-in-use') {
                    toast_1.setMessage('O e-mail digitado já está em uso.');
                }
                else if (error.code == 'auth/invalid-email') {
                    toast_1.setMessage('O e-mail digitado não é valido.');
                }
                else if (error.code == 'auth/operation-not-allowed') {
                    toast_1.setMessage('Não está habilitado criar usuários.');
                }
                else if (error.code == 'auth/weak-password') {
                    toast_1.setMessage('A senha digitada é muito fraca.');
                }
                else if (error.code == 'auth/internal-error') {
                    toast_1.setMessage('Erro interno');
                }
                toast_1.present();
            });
        }
    };
    return CriarcontaPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('form'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* NgForm */])
], CriarcontaPage.prototype, "form", void 0);
CriarcontaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-criarconta',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/criarconta/criarconta.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <ion-title>\n            CRIAR NOVA CONTA\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n    <form #form="ngForm" novalidate>\n        <ion-list>\n\n        <ion-item>\n            <ion-label stacked>E-MAIL</ion-label>\n            <ion-input type="text" name="email" [(ngModel)]="user.email" #email="ngModel" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf="email.errors && (email.dirty || email.touched)" class="text-danger">\n            O campo é obrigatório\n        </ion-item>\n\n        <ion-item>\n            <ion-label stacked>SENHA</ion-label>\n            <ion-input type="password" name="password" [(ngModel)]="user.password" #password="ngModel" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf="password.errors && (password.dirty || password.touched)" class="text-danger">\n            O campo é obrigatório\n        </ion-item>\n\n        </ion-list>\n\n        <button ion-button block color="primary" [disabled]="!form.form.valid" (click)="criarConta()">\n            CRIAR CONTA\n        </button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/criarconta/criarconta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]])
], CriarcontaPage);

//# sourceMappingURL=criarconta.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_user__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resetpassword_resetpassword__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, toastCtrl, carregarCtrl, authPrvd) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.carregarCtrl = carregarCtrl;
        this.authPrvd = authPrvd;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__providers_auth_user__["a" /* User */]();
    }
    LoginPage.prototype.signIn = function () {
        var _this = this;
        var carregando = this.carregarCtrl.create({
            content: "Entrando...",
            duration: 500
        });
        if (this.form.form.valid) {
            this.authPrvd.signIn(this.user)
                .then(function () {
                carregando.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            })
                .catch(function (error) {
                var toast = _this.toastCtrl.create({ duration: 3000, position: 'bottom' });
                if (error.code == 'auth/invalid-email') {
                    toast.setMessage('O e-mail digitado não é valido.');
                }
                else if (error.code == 'auth/user-disabled') {
                    toast.setMessage('O usuário está desativado.');
                }
                else if (error.code == 'auth/user-not-found') {
                    toast.setMessage('O usuário não foi encontrado.');
                }
                else if (error.code == 'auth/wrong-password') {
                    toast.setMessage('A senha digitada não é valida.');
                }
                toast.present();
            });
        }
    };
    LoginPage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__resetpassword_resetpassword__["a" /* ResetpasswordPage */]);
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('form'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* NgForm */])
], LoginPage.prototype, "form", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/login/login.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <ion-title>\n            LOGIN\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n    <form #form="ngForm" novalidate>\n        <ion-list>\n\n        <ion-item>\n            <ion-label stacked>E-MAIL</ion-label>\n            <ion-input type="text" name="email" [(ngModel)]="user.email" #email="ngModel" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf="email.errors && (email.dirty || email.touched)" class="text-danger">\n            O campo é obrigatório\n        </ion-item>\n\n        <ion-item>\n            <ion-label stacked>SENHA</ion-label>\n            <ion-input type="password" name="password" [(ngModel)]="user.password" #password="ngModel" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf="password.errors && (password.dirty || password.touched)" class="text-danger">\n            O campo é obrigatório\n        </ion-item>\n\n        </ion-list>\n\n        <button ion-button block color="primary" [disabled]="!form.form.valid" (click)="signIn()">\n            ENTRAR\n        </button>\n    </form>\n\n    <button ion-button block clear (click)="resetPassword()">\n        ESQUECI MINHA SENHA\n    </button>\n\n</ion-content>'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetpasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetpasswordPage = (function () {
    function ResetpasswordPage(navCtrl, toastCtrl, authPrvd) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.authPrvd = authPrvd;
        this.userEmail = '';
    }
    ResetpasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (this.form.form.valid) {
            var toast_1 = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
            this.authPrvd.resetPassword(this.userEmail)
                .then(function () {
                toast_1.setMessage('Solicitação foi enviada para o seu e-mail.');
                toast_1.present();
                _this.navCtrl.pop();
            })
                .catch(function (error) {
                if (error.code == 'auth/invalid-email') {
                    toast_1.setMessage('O e-mail digitado não é valido.');
                }
                else if (error.code == 'auth/user-not-found') {
                    toast_1.setMessage('O usuário não foi encontrado.');
                }
                toast_1.present();
            });
        }
    };
    return ResetpasswordPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('form'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* NgForm */])
], ResetpasswordPage.prototype, "form", void 0);
ResetpasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-resetpassword',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/resetpassword/resetpassword.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <ion-title>\n            RESETAR MINHA SENHA\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n  \n  \n<ion-content padding>\n    <form #form="ngForm" novalidate>\n        <ion-list>\n            <ion-item>\n                <ion-label stacked>E-MAIL</ion-label>\n                <ion-input type="text" name="email" [(ngModel)]="userEmail" #email="ngModel" required></ion-input>\n            </ion-item>\n            <ion-item *ngIf="email.errors && (email.dirty || email.touched)" class="text-danger">\n                O campo é obrigatório\n            </ion-item>\n    \n        </ion-list>\n    \n        <button ion-button block color="primary" [disabled]="!form.form.valid" (click)="resetPassword()">\n            RESETAR MINHA SENHA\n        </button>\n    </form>\n</ion-content>'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/resetpassword/resetpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], ResetpasswordPage);

//# sourceMappingURL=resetpassword.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Itens */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListadecomprasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__listassalvas_listassalvas__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__autenticacao_autenticacao__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Itens = (function () {
    function Itens() {
        this.produtos = new Array();
    }
    return Itens;
}());

var ListadecomprasPage = (function () {
    function ListadecomprasPage(alertCtrl, db, navParams, navCtrl, modalCtrl, angFireAuth) {
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.angFireAuth = angFireAuth;
        try {
            if (this.angFireAuth.auth.currentUser != null)
                this.lista = db.list('/itens_usuarios/' + this.angFireAuth.auth.currentUser.uid);
            else {
                //this.lista = db.list('/itens_anonimos');
                this.alerta();
            }
        }
        catch (error) {
            console.log(error);
        }
        this.itens = new Itens;
    }
    //Função que avisa caso o usuário ainda não tenha logado
    ListadecomprasPage.prototype.alerta = function () {
        var _this = this;
        var alerta = this.alertCtrl.create({
            title: 'Voce não está logado. Por favor, faça login.',
            message: 'Faça login para poder salvar suas lista de compras!',
            buttons: [
                {
                    text: 'Fazer login',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__autenticacao_autenticacao__["a" /* AutenticacaoPage */]);
                    }
                },
                {
                    text: 'Ok'
                }
            ]
        });
        alerta.present();
    };
    ListadecomprasPage.prototype.cadastrar1 = function (nome) {
        var _this = this;
        if (this.arroz)
            this.itens.produtos.push("arroz");
        if (this.feijao)
            this.itens.produtos.push("feijão");
        if (this.oleo)
            this.itens.produtos.push("óleo");
        if (this.acucar)
            this.itens.produtos.push("açúcar");
        if (this.sal)
            this.itens.produtos.push("sal");
        if (this.cafe)
            this.itens.produtos.push("café");
        if (this.leiteempo)
            this.itens.produtos.push("leite em pó");
        if (this.macarrao)
            this.itens.produtos.push("macarrão");
        if (this.extratoTomate)
            this.itens.produtos.push("extrato de tomate");
        if (this.tempero)
            this.itens.produtos.push("tempero completo");
        if (this.achocolatado)
            this.itens.produtos.push("Achocolatado em pó");
        if (this.molhoTomate)
            this.itens.produtos.push("molho de tomate");
        if (this.farinhaTrigo)
            this.itens.produtos.push("farinha de trigo");
        if (this.gelatina)
            this.itens.produtos.push("gelatina");
        if (this.biscoito)
            this.itens.produtos.push("biscoito");
        if (this.milho)
            this.itens.produtos.push("milho verde");
        this.itens.nome = nome;
        this.lista.push(this.itens).then(function () {
            _this.itens = new Itens();
        });
        //Setando checkbox false após criar nova lista de compras
        this.arroz = false;
        this.feijao = false;
        this.oleo = false;
        this.acucar = false;
        this.cafe = false;
        this.leiteempo = false;
        this.sal = false;
        this.macarrao = false;
        this.extratoTomate = false;
        this.tempero = false;
        this.achocolatado = false;
        this.molhoTomate = false;
        this.farinhaTrigo = false;
        this.gelatina = false;
        this.biscoito = false;
        this.milho = false;
    };
    ListadecomprasPage.prototype.cadastrar = function () {
        var _this = this;
        var nome;
        var prompt = this.alertCtrl.create({
            title: 'Nova lista de compras',
            message: "Digite o nome da sua lista de compras",
            inputs: [{
                    name: 'title',
                    placeholder: 'Nome'
                }],
            buttons: [{
                    text: 'Cancelar',
                    handler: function (data) {
                        nome = null;
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Salvar',
                    handler: function (data) {
                        console.log('Save clicked');
                        nome = data.title;
                        _this.cadastrar1(nome);
                    }
                }
            ]
        });
        prompt.present();
    };
    //Função que chama pagina das listas salvas
    ListadecomprasPage.prototype.obterValor = function (value) {
        console.log("era pra abrir as listas salvas!!!!!");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__listassalvas_listassalvas__["a" /* ListassalvasPage */]);
    };
    return ListadecomprasPage;
}());
ListadecomprasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-listadecompras',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/listadecompras/listadecompras.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Lista de compras</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="obterValor({value: 0})">listas salvas</button>\n        </ion-buttons> \n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding> \n\n    <ion-item>\n        <ion-label>Arroz</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="arroz"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Feijão</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="feijao"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Óleo</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="oleo"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Açúcar</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="acucar"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Café</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="cafe"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Leite em pó</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="leiteempo"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Sal</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="sal"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Macarrão</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="macarrao"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Extrato de tomate</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="extratoTomate"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Tempero completo</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="tempero"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Achocolatado em pó</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="achocolatado"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Molho de tomate</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="molhoTomate"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Farinha de trigo</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="farinhaTrigo"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Gelatina</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="gelatina"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Biscoito</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="biscoito"></ion-checkbox>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Milho verde</ion-label>\n        <ion-checkbox color="dark" [(ngModel)]="milho"></ion-checkbox>\n    </ion-item> \n    \n    <ion-fab right bottom>\n        <button ion-fab color="dark" (click)="cadastrar()">\n            <ion-icon name="add"></ion-icon>\n        </button>\n    </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/listadecompras/listadecompras.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _f || Object])
], ListadecomprasPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=listadecompras.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(322);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_autenticacao_autenticacao__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_criarconta_criarconta__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_resetpassword_resetpassword__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_listadecompras_listadecompras__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_listassalvas_listassalvas__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_auth_auth__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_photo_photo__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//Páginas












//Configurações do projeto no firebase
var config = {
    apiKey: "AIzaSyABJbPo5ljMw4frcrx1lqAck1g5vNOusUw",
    authDomain: "plusfinancas.firebaseapp.com",
    databaseURL: "https://plusfinancas.firebaseio.com",
    projectId: "plusfinancas",
    storageBucket: "plusfinancas.appspot.com",
    messagingSenderId: "65279366698"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_autenticacao_autenticacao__["a" /* AutenticacaoPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_criarconta_criarconta__["a" /* CriarcontaPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_resetpassword_resetpassword__["a" /* ResetpasswordPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_listadecompras_listadecompras__["a" /* ListadecomprasPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_listassalvas_listassalvas__["a" /* ListassalvasPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database_deprecated__["b" /* AngularFireDatabaseModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_autenticacao_autenticacao__["a" /* AutenticacaoPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_criarconta_criarconta__["a" /* CriarcontaPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_resetpassword_resetpassword__["a" /* ResetpasswordPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_listadecompras_listadecompras__["a" /* ListadecomprasPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_listassalvas_listassalvas__["a" /* ListassalvasPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_20__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_21__providers_photo_photo__["a" /* PhotoProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_autenticacao_autenticacao__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_listadecompras_listadecompras__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'MINHA CONTA', component: __WEBPACK_IMPORTED_MODULE_5__pages_autenticacao_autenticacao__["a" /* AutenticacaoPage */] },
            { title: 'HOME', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'LISTA DE COMPRAS', component: __WEBPACK_IMPORTED_MODULE_6__pages_listadecompras_listadecompras__["a" /* ListadecomprasPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.overlaysWebView(true);
            //this.statusBar.styleDefault();
            _this.statusBar.backgroundColorByHexString('#cc6908');
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]) === "function" && _a || Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar color="laranja">\n            <ion-title>MENU</ion-title>\n        </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n        <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            {{p.title}}\n        </button>\n        </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object])
], MyApp);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Itens */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListassalvasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Itens = (function () {
    function Itens() {
        this.produtos = new Array();
    }
    return Itens;
}());

var ListassalvasPage = (function () {
    //itens: Itens;
    function ListassalvasPage(navCtrl, navParams, db, angFireAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angFireAuth = angFireAuth;
        try {
            if (this.angFireAuth.auth.currentUser != null)
                this.lista = db.list('/itens_usuarios/' + this.angFireAuth.auth.currentUser.uid);
            else
                this.lista = db.list('/itens_anonimos');
        }
        catch (error) {
            console.log(error);
        }
        //this.itens = new Itens();
    }
    ListassalvasPage.prototype.editar = function () {
        console.log("clicou editar");
    };
    ListassalvasPage.prototype.excluir = function (id) {
        this.lista.remove(id).then(function () {
            console.log("Exclui: " + id);
        });
    };
    return ListassalvasPage;
}());
ListassalvasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-listassalvas',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/listassalvas/listassalvas.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <ion-title>Listas Salvas</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card *ngFor="let itens of lista | async" color="laranja_c">\n        <ion-card-header>\n            {{itens.nome}}\n        </ion-card-header>\n        <ion-card-content>    \n                {{itens.produtos}}\n            <ion-item color="laranja_c">\n                <ion-avatar item-end (click)="excluir(itens.$key)">\n                    <ion-icon name="trash"></ion-icon>\n                </ion-avatar>\n                \n            </ion-item>\n        </ion-card-content>\n    </ion-card>\n\n    <!--ion-card *ngFor="let itens of lista | async" color="azul">\n        <ion-avatar item-end (click)="excluir(itens.$key)">\n            <ion-icon name="trash"></ion-icon>\n        </ion-avatar>\n        <ion-card-header>\n            {{itens.nome}}\n        </ion-card-header>\n        <ion-card-content>\n            {{itens.produtos}}\n        </ion-card-content>\n        \n    </ion-card-->\n          \n    \n    <!--ion-list *ngFor="let itens of lista | async">\n        <ion-item-sliding (ionDrag)="excluir($key)">\n            <ion-item>\n                <ion-avatar item-start>\n                    <ion-icon name="trash"></ion-icon>\n                </ion-avatar>\n                <p>{{itens.nome}}</p>\n            </ion-item>\n            <ion-item-options>\n                    <button ion-button color="light" icon-start>\n                      <ion-icon name="ios-more"></ion-icon>\n                      More\n                    </button>\n                    <button ion-button color="primary" icon-start>\n                      <ion-icon name="text"></ion-icon>\n                      Text\n                    </button>\n                    <button ion-button color="secondary" icon-start>\n                      <ion-icon name="call"></ion-icon>\n                      Call\n                    </button>\n            </ion-item-options>\n        </ion-item-sliding>    \n    </ion-list-->\n</ion-content>'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/listassalvas/listassalvas.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_deprecated__["a" /* AngularFireDatabase */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _d || Object])
], ListassalvasPage);

var _a, _b, _c, _d;
//# sourceMappingURL=listassalvas.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_photo_photo__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__autenticacao_autenticacao__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { BarcodeProvider } from '../../providers/barcode/barcode';




var HomePage = (function () {
    function HomePage(actionSheetCtrl, loadingCtrl, camera, photoPrvd, db, toastCtrl, angFireAuth, 
        //private barcodeprvd: BarcodeProvider,
        alertCtrl, navCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.photoPrvd = photoPrvd;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.angFireAuth = angFireAuth;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        try {
            this.lista = db.list('/caminho_das_imagens/');
        }
        catch (error) {
            console.log(error);
        }
    }
    HomePage.prototype.pickImageFromGallery = function () {
        var _this = this;
        try {
            //Só pode pegar imagem com login
            if (this.angFireAuth.auth.currentUser != null) {
                this.camera.getPicture({
                    destinationType: this.camera.DestinationType.DATA_URL,
                    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
                    allowEdit: true,
                    quality: 30
                }).then(function (imageData) {
                    _this.base64Image = "data:image/jpeg;base64," + imageData;
                    _this.photoPrvd.uploadPhoto(_this.base64Image);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                //Alerta caso não teha login
                this.alerta();
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    HomePage.prototype.takePicture = function () {
        var _this = this;
        try {
            //Só pode pegar imagem com login
            if (this.angFireAuth.auth.currentUser != null) {
                this.camera.getPicture({
                    destinationType: this.camera.DestinationType.DATA_URL,
                    sourceType: this.camera.PictureSourceType.CAMERA,
                    encodingType: this.camera.EncodingType.PNG,
                    allowEdit: true,
                    quality: 30
                }).then(function (imageData) {
                    _this.base64Image = "data:image/jpeg;base64," + imageData;
                    _this.photoPrvd.uploadPhoto(_this.base64Image);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                //Alerta caso não tenha login
                this.alerta();
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    /*
    baixarArquivo(nome: string){
        let storageRef = firebase.storage().ref('/Users/');
        let caminho = storageRef.child('images/'+nome);
        caminho.getDownloadURL().then(url => {
           console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
        });
    }
    */
    HomePage.prototype.codigoBarras = function () {
        //Código de barras -> Única coisa que não me deu trabalho nessa porra :)
        //this.barcodeprvd.alertaCodBarras();
    };
    /*
    salvarPromocao(promo){
        try {
            if(this.angFireAuth.auth.currentUser != null){
                this.promocoeslista = this.db.list('/promocoes_salvas/'
                + this.angFireAuth.auth.currentUser.uid);

                this.promocoeslista.push(promo);

                let toast = this.toastCtrl.create({
                    message: 'Promocao salva',
                    duration: 3000
                });
                toast.present();

            } else {
                this.alerta();
            }

        } catch (error) {
            console.log(error);
        }
    }
    */
    HomePage.prototype.alerta = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Voce não está logado.',
            message: 'Você precisa estar logado para salvar suas promoções!',
            buttons: [
                {
                    text: 'Fazer login',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__autenticacao_autenticacao__["a" /* AutenticacaoPage */]);
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        }).present();
    };
    HomePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Choose Photo',
                    handler: function () {
                        _this.getPicture(0); // 0 == Library
                    }
                }, {
                    text: 'Take Photo',
                    handler: function () {
                        _this.getPicture(1); // 1 == Camera
                    }
                }, {
                    text: 'Demo Photo',
                    handler: function () {
                        _this.srcImage = '../../assets/imgs/cupom.jpg';
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.getPicture = function (sourceType) {
        var _this = this;
        this.camera.getPicture({
            quality: 100,
            destinationType: 0,
            sourceType: sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(function (imageData) {
            _this.srcImage = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log("ERROR -> " + JSON.stringify(err));
        });
    };
    HomePage.prototype.analyze = function () {
        var loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loader.present();
        window.OCRAD(document.getElementById('image'), function (text) {
            loader.dismissAll();
            alert(text);
            console.log(text);
        });
    };
    HomePage.prototype.restart = function () {
        this.srcImage = '';
        this.presentActionSheet();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>HOME</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <ion-card>\n        <ion-card-content>\n            <ion-card-title>\n                Nome\n            </ion-card-title>\n            <p>\n                Itens\n            </p>\n            <p>\n                Valor\n            </p>\n            <p>\n                Data\n            </p>\n        </ion-card-content>\n    </ion-card>\n\n    <br>\n    <button class="select-image" ion-button block *ngIf="!srcImage" (click)="presentActionSheet()" color="light">\n        <ion-icon name="camera"></ion-icon>\n    </button>\n    \n    <div *ngIf="srcImage" class="image-wrapper">\n        <img id="image" [src]="srcImage" />\n        <button ion-button icon-left block (click)="analyze()" color="light">\n            <ion-icon name="search"></ion-icon>\n            Read\n        </button>\n        <button ion-button icon-left block (click)="restart()" color="light">\n            <ion-icon name="refresh"></ion-icon>\n            Restart\n        </button>\n    </div>\n\n\n\n    <ion-fab right bottom>\n        <button ion-fab color="verde">\n            <ion-icon name="add"></ion-icon>\n        </button>\n        <ion-fab-list side="top">\n            \n            <button ion-fab (click)="takePicture()"><ion-icon name="camera"></ion-icon></button>\n            <button ion-fab (click)="pickImageFromGallery()"><ion-icon name="photos"></ion-icon></button>\n            <button ion-fab (click)="codigoBarras()"><ion-icon name="barcode"></ion-icon></button>\n        \n        </ion-fab-list>\n    </ion-fab>\n    \n</ion-content>\n'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__providers_photo_photo__["a" /* PhotoProvider */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database_deprecated__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthProvider = (function () {
    function AuthProvider(angularFireAuth, facebook) {
        this.angularFireAuth = angularFireAuth;
        this.facebook = facebook;
    }
    AuthProvider.prototype.createUser = function (user) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    };
    AuthProvider.prototype.signIn = function (user) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    };
    AuthProvider.prototype.signInWithFacebook = function () {
        var _this = this;
        return this.facebook.login(['public_profile', 'email'])
            .then(function (res) {
            //https://developers.facebook.com/docs/graph-api/reference/user
            //Ao logar com o facebook o profile do usuario é automaticamente atualizado.
            return _this.angularFireAuth.auth.signInWithCredential(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken));
        });
    };
    AuthProvider.prototype.signOut = function () {
        var _this = this;
        if (this.angularFireAuth.auth.currentUser.providerData.length) {
            for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
                var provider = this.angularFireAuth.auth.currentUser.providerData[i];
                if (provider.providerId == __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].FacebookAuthProvider.PROVIDER_ID) {
                    return this.facebook.logout().then(function () {
                        return _this.signOutFirebase();
                    });
                }
            }
        }
        return this.signOutFirebase();
    };
    AuthProvider.prototype.signOutFirebase = function () {
        return this.angularFireAuth.auth.signOut();
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.deleteAccount = function () {
        try {
            return this.angularFireAuth.auth.currentUser.delete();
        }
        catch (err) {
            console.log(JSON.stringify(err));
        }
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutenticacaoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__criarconta_criarconta__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AutenticacaoPage = (function () {
    function AutenticacaoPage(navCtrl, alertCtrl, toastCtrl, carregarCtrl, angularFireAuth, authPrvd) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.carregarCtrl = carregarCtrl;
        this.angularFireAuth = angularFireAuth;
        this.authPrvd = authPrvd;
        this.logado = false;
        this.emailUsuario = "";
        if (this.angularFireAuth.auth.currentUser != null) {
            this.logado = true;
            this.emailUsuario = this.angularFireAuth.auth.currentUser.email;
        }
    }
    AutenticacaoPage.prototype.criarConta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__criarconta_criarconta__["a" /* CriarcontaPage */]);
    };
    AutenticacaoPage.prototype.entrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    AutenticacaoPage.prototype.entrarComFacebook = function () {
        var _this = this;
        this.authPrvd.signInWithFacebook().then(function () {
            _this.carregarCtrl.create({
                content: "Entrando...",
                duration: 500
            }).present();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
        }).catch(function (error) {
            console.log(error);
            _this.toastCtrl.create({
                duration: 3000, position: 'bottom',
                message: 'Erro ao efetuar o login: ' + error.toString()
            }).present();
        });
    };
    AutenticacaoPage.prototype.signOut = function () {
        var carregando = this.carregarCtrl.create({
            content: "Saindo...",
            duration: 500
        });
        //this.authPrvd.signOutFirebase();
        this.authPrvd.signOut();
        carregando.present();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    AutenticacaoPage.prototype.deletarConta = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            duration: 3000,
            message: 'Conta excluída com sucesso!'
        });
        var alert = this.alertCtrl.create({
            title: 'Você está certo disso?',
            subTitle: 'Você está prestes a excluir sua conta',
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Excluir',
                    handler: function () {
                        _this.authPrvd.deleteAccount().
                            catch(function (err) {
                            console.log(err);
                        });
                        toast.present();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    return AutenticacaoPage;
}());
AutenticacaoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-autenticacao',template:/*ion-inline-start:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/autenticacao/autenticacao.html"*/'<ion-header>\n    <ion-navbar color="laranja">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>MINHA CONTA</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="signOut()" *ngIf="logado">sair</button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    <!-- se não estiver logado mostrará opções de login--> \n    <button ion-button block color="facebook" (click)="entrarComFacebook()" *ngIf="!logado">FACEBOOK</button>\n    <br>\n    <button ion-button block color="azul" (click)="entrar()" *ngIf="!logado">ENTRAR</button>\n    <br>\n    <button ion-button block clear (click)="criarConta()" *ngIf="!logado">OU CRIAR UMA CONTA</button>\n    <!-- se não estiver logado mostrará opções de login-->\n\n    <!--Se estiver logado mostrará informações do usuário-->\n    <ion-card *ngIf="logado">\n        <ion-card-content>\n            <ion-card-title>{{emailUsuario}}</ion-card-title>\n        </ion-card-content>\n    </ion-card>\n    <!--Se estiver logado mostrará informações do usuário-->\n\n\n    <ion-footer no-shadow *ngIf="logado">\n        <ion-toolbar position="bottom">\n            <button ion-button color="danger" block (click)="deletarConta()">\n                EXCLUIR MINHA CONTA\n            </button>\n        </ion-toolbar>\n    </ion-footer>   \n\n</ion-content>\n'/*ion-inline-end:"/home/fernando/Documentos/UFT/Projeto de Sistemas/plusFinancas/src/pages/autenticacao/autenticacao.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */]])
], AutenticacaoPage);

//# sourceMappingURL=autenticacao.js.map

/***/ })

},[305]);
//# sourceMappingURL=main.js.map