import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController,LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    user: User = new User();
    @ViewChild('form') form: NgForm;

    constructor(
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private carregarCtrl: LoadingController,
        private authPrvd: AuthProvider
    ) {
    }

    signIn() {
        let carregando = this.carregarCtrl.create({
            content: "Entrando...",
            duration: 500
        });
        if (this.form.form.valid) {
            this.authPrvd.signIn(this.user)
            .then(() => {
                carregando.present();
                this.navCtrl.setRoot(HomePage);
            })
            .catch((error: any) => {
                let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
                if (error.code == 'auth/invalid-email') {
                    toast.setMessage('O e-mail digitado não é valido.');
                } else if (error.code == 'auth/user-disabled') {
                    toast.setMessage('O usuário está desativado.');
                } else if (error.code == 'auth/user-not-found') {
                    toast.setMessage('O usuário não foi encontrado.');
                } else if (error.code == 'auth/wrong-password') {
                    toast.setMessage('A senha digitada não é valida.');
                }
                toast.present();
            });
        }
    }


    resetPassword(){
        this.navCtrl.push(ResetpasswordPage);
    }

}
