import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-criarconta',
  templateUrl: 'criarconta.html',
})
export class CriarcontaPage {

    user: User = new User();
    @ViewChild('form') form: NgForm;
  
    constructor(
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private authService: AuthProvider
    ) {
    }
  
    criarConta() {
        if (this.form.form.valid) {
            let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    
            this.authService.createUser(this.user)
            .then((user: any) => {
                console.log("Usuário autenticado");
                user.sendEmailVerification();
    
                toast.setMessage('Usuário criado com sucesso.');
                toast.present();
    
                this.navCtrl.setRoot(HomePage);
            })
            .catch((error: any) => {
                console.log("Erro: ", error.code);
                if (error.code  == 'auth/email-already-in-use') {
                    toast.setMessage('O e-mail digitado já está em uso.');
                } else if (error.code  == 'auth/invalid-email') {
                    toast.setMessage('O e-mail digitado não é valido.');
                } else if (error.code  == 'auth/operation-not-allowed') {
                    toast.setMessage('Não está habilitado criar usuários.');
                } else if (error.code  == 'auth/weak-password') {
                    toast.setMessage('A senha digitada é muito fraca.');
                } else if (error.code == 'auth/internal-error') {
                    toast.setMessage('Erro interno');
                }
                toast.present();
            });
        }
    }

}
