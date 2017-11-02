import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

    userEmail: string = '';
    @ViewChild('form') form: NgForm;
  
    constructor(
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private authPrvd: AuthProvider) {
    }
  
    resetPassword() {
        if (this.form.form.valid) {
    
            let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
            this.authPrvd.resetPassword(this.userEmail)
            .then(() => {
                toast.setMessage('Solicitação foi enviada para o seu e-mail.')
                toast.present();
    
                this.navCtrl.pop();
            })
            .catch((error: any) => {
                if (error.code == 'auth/invalid-email') {
                toast.setMessage('O e-mail digitado não é valido.');
                } else if (error.code == 'auth/user-not-found') {
                toast.setMessage('O usuário não foi encontrado.');
                }
    
                toast.present();
            });
        }
    }

}
