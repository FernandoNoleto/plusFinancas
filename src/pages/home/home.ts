import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { PhotoProvider } from '../../providers/photo/photo';
//import { BarcodeProvider } from '../../providers/barcode/barcode';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AutenticacaoPage } from '../autenticacao/autenticacao';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public base64Image: string;
    lista: FirebaseListObservable<any>;
    

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private loadingCtrl: LoadingController,
        private camera: Camera,
        private photoPrvd: PhotoProvider,
        private db: AngularFireDatabase,
        private toastCtrl: ToastController,
        private angFireAuth: AngularFireAuth,
        //private barcodeprvd: BarcodeProvider,
        private alertCtrl: AlertController,
        private navCtrl: NavController      
    ) {        
        
        try {
            this.lista = db.list('/caminho_das_imagens/');
        } catch (error) {
            console.log(error);
        }
        
    }


	pickImageFromGallery(){

        try {
            //Só pode pegar imagem com login
            if(this.angFireAuth.auth.currentUser != null){            
                this.camera.getPicture({
                    destinationType: this.camera.DestinationType.DATA_URL,
                    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
                    allowEdit: true,
                    quality: 30
                }).then((imageData) => {
                    this.base64Image = "data:image/jpeg;base64," + imageData;
                    this.photoPrvd.uploadPhoto(this.base64Image);
                }, (err) => {
                    console.log(err);
                });
            }
            else{
                //Alerta caso não teha login
                this.alerta();
            }
        } catch (error) {
            console.log(error);
        }

    }
    
    
    takePicture(){

        try {
            //Só pode pegar imagem com login
            if(this.angFireAuth.auth.currentUser != null){

                this.camera.getPicture({
                    destinationType : this.camera.DestinationType.DATA_URL,
                    sourceType : this.camera.PictureSourceType.CAMERA,
                    encodingType: this.camera.EncodingType.PNG,
                    allowEdit: true,
                    quality: 30
                }).then((imageData) => {
                    this.base64Image = "data:image/jpeg;base64," + imageData;
                    this.photoPrvd.uploadPhoto(this.base64Image);
                }, (err) =>  {
                    console.log(err);
                });

         
            } else {
                //Alerta caso não tenha login
                this.alerta();
            }

        } catch (error) {
            console.log(error);
        }
        
       
    }
    
    /*
    baixarArquivo(nome: string){
        let storageRef = firebase.storage().ref('/Users/');
        let caminho = storageRef.child('images/'+nome);
        caminho.getDownloadURL().then(url => {
           console.log(url); // AQUI VOCÊ JÁ TEM O ARQUIVO
        });
    }
    */

    codigoBarras(){
        //Código de barras -> Única coisa que não me deu trabalho nessa porra :)
        //this.barcodeprvd.alertaCodBarras();
    }

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
    

    alerta(){
        this.alertCtrl.create({
            title: 'Voce não está logado.',
            message: 'Você precisa estar logado para salvar suas promoções!',
            buttons: [
                {
                    text: 'Fazer login',
                    handler: () => {
                        this.navCtrl.push(AutenticacaoPage);
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        }).present();

    }

    /*
    irParaMapa(img_selec){
        try {
            this.navCtrl.push(MapapromocoesPage, img_selec);
        } catch (error) {
            console.log(error);
        }
    }
    */

    srcImage: string;
    OCRAD: any;
    
    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                text: 'Choose Photo',
                handler: () => {
                    this.getPicture(0); // 0 == Library
                }
                },{
                text: 'Take Photo',
                handler: () => {
                    this.getPicture(1); // 1 == Camera
                }
                },{
                text: 'Demo Photo',
                handler: () => {
                    this.srcImage = '../../assets/imgs/demo.png';
                }
                },{
                text: 'Cancel',
                role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    
    getPicture(sourceType: number) {

        this.camera.getPicture({
            quality: 100,
            destinationType: 0, // DATA_URL
            sourceType,
            allowEdit: true,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then((imageData) => {
            this.srcImage = `data:image/jpeg;base64,${imageData}`;
        }, (err) => {
            console.log(`ERROR -> ${JSON.stringify(err)}`);
        });
    }
    
    analyze() {
        let loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //loader.present();
        (<any>window).OCRAD(document.getElementById('image'), text => {
            //loader.dismissAll();
            this.alertCtrl.create({
                message: text,
                buttons: ['OK']
            }).present();
            alert(text);
            console.log(text);
        });
    }
    
    restart() {
        this.srcImage = '';
        this.presentActionSheet();
    }

}
