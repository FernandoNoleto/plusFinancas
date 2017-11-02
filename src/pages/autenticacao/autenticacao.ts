import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CriarcontaPage } from '../criarconta/criarconta';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@Component({
    selector: 'page-autenticacao',
    templateUrl: 'autenticacao.html',
})
export class AutenticacaoPage {

    logado: boolean = false;
    emailUsuario: string = "";

    constructor(
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private carregarCtrl: LoadingController,
        private angularFireAuth: AngularFireAuth,
        private authPrvd: AuthProvider
    ) {
        if(this.angularFireAuth.auth.currentUser != null){
            this.logado = true;
            this.emailUsuario = this.angularFireAuth.auth.currentUser.email;
        }   
    }

    criarConta(){
        this.navCtrl.push(CriarcontaPage);
    }

    entrar(){
        this.navCtrl.push(LoginPage);
    }

    entrarComFacebook(){
        this.authPrvd.signInWithFacebook().then(() => {
            this.carregarCtrl.create({
                content: "Entrando...",
                duration: 500
            }).present();
            this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
            console.log(error);
            this.toastCtrl.create({
                duration: 3000, position: 'bottom',
                message: 'Erro ao efetuar o login: '+error.toString()
            }).present();
        });
    }

    signOut(){
        let carregando = this.carregarCtrl.create({
            content: "Saindo...",
            duration: 500
        });

        //this.authPrvd.signOutFirebase();
        this.authPrvd.signOut();
        carregando.present();
        this.navCtrl.setRoot(HomePage);
    }

    deletarConta(){
        let toast = this.toastCtrl.create({
            duration: 3000,
            message: 'Conta excluída com sucesso!'
        });

        let alert = this.alertCtrl.create({
            title: 'Você está certo disso?',
            subTitle: 'Você está prestes a excluir sua conta',
            buttons: [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Excluir',
                    handler: () => {
                        this.authPrvd.deleteAccount().
                        catch((err) => {
                            console.log(err);
                        });
                        toast.present();
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });
        alert.present();
    }




}
