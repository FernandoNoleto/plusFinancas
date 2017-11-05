import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';


export class Itens {
	nome: string;
	produtos: Array<string> = new Array();
}

@Component({
    selector: 'page-listassalvas',
    templateUrl: 'listassalvas.html',
})

export class ListassalvasPage {

    lista: FirebaseListObservable<any>;
	//itens: Itens;
    
    constructor(
        public navCtrl: NavController, public navParams: NavParams,
        db: AngularFireDatabase,
        public angFireAuth: AngularFireAuth
    ) {
        try {
            if(this.angFireAuth.auth.currentUser != null)
                this.lista = db.list('/itens_usuarios/' + this.angFireAuth.auth.currentUser.uid);
            else
                this.lista = db.list('/itens_anonimos');
        } catch (error) {
            console.log(error);
        }
        //this.itens = new Itens();
    }
    
    editar(){
        console.log("clicou editar");
    }

    excluir(id: string){
        this.lista.remove(id).then(() => {
            console.log("Exclui: "+ id);
        });
    }


    /*
    swipe(id: string){
        this.lista.remove(id).then(() => {
            console.log("Exclui: "+ id);
        });
    }
    */

}
