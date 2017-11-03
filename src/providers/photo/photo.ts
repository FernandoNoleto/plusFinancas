import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Geolocation } from '@ionic-native/geolocation';

//adicionar outras informações posteriormente
export class Foto {
    cod: string;
    nome: string;
    url: string;
    latitude: any;
    longitude: any;
}

@Injectable()
export class PhotoProvider {

    foto: Foto;
    lista_caminho: FirebaseListObservable<any>;

    constructor (
        private alertCtrl: AlertController,
        private geolocation: Geolocation,
        private db: AngularFireDatabase,
        private toastCtrl: ToastController,
        private angFireAuth: AngularFireAuth
    ) {
        try {
            this.lista_caminho = db.list('/caminho_das_imagens/');
        } catch (error) {
            console.log(error);
        }

        this.foto = new Foto;
        
    }

    uploadPhoto1(captureDataUrl: string){

        /*BEGIN_Pegar local da foto*/
        this.geolocation.getCurrentPosition().then((resp) => {
    
            //Coordenadas da foto....
            this.foto.latitude = resp.coords.latitude;
            this.foto.longitude = resp.coords.longitude;
        
        }).catch((error) => {
            this.toastCtrl.create({
                message: error,
                duration: 3000}
            ).present();
            //console.log('Error getting location', error);
        });
    
        /*END_Pegar local da foto*/

        /*BEGIN_Aqui realmente se faz o upload da foto*/
        let storageRef = firebase.storage().ref('/Users/');
        const filename = Math.floor(Date.now() / 1000);
        let uploadTask = storageRef.child(`${filename}.jpg`);
        uploadTask.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot) => {
            //código da foto: um número aleatório
            this.foto.cod = filename.toString();
            //caminho da foto: caminho que está armezenado dentro do firebase
            this.foto.url = snapshot.downloadURL;
            //Armazenando o caminho da foto
            this.lista_caminho.push(this.foto);

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.toastCtrl.create({
                message: progress.toString() + '% done',
                showCloseButton: true
            }).present();
            
            this.foto = new Foto;    
        })
        .catch((erro) => {
            this.toastCtrl.create({
                message: erro.message,
                showCloseButton: true
            }).present();
        });

        /*END_Aqui realmente se faz o upload da foto*/

    }

    uploadPhoto(captureDataUrl: string){
        /*BEGIN_Alerta para fornecer uma descrição para a promoção*/ 

        this.alertCtrl.create({
            title: 'Digite um título pra sua compra',
            inputs: [{
                name: 'nome_promo',
                placeholder: 'Título'
            }],
            buttons: [{
                text: 'Cancelar',
                handler: data => {
                    this.foto.nome = 'Sem título';
                    this.uploadPhoto1(captureDataUrl);
                }
            },
            {
                text: 'Ok',
                handler: data => {
                    console.log('Save clicked');
                    this.foto.nome = data.nome_promo;
                    this.uploadPhoto1(captureDataUrl);
                }
            }]
        }).present();

        /*END_Alerta para fornecer uma descrição para a promoção*/
    }
    

}
