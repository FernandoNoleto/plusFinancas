import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ListassalvasPage } from '../listassalvas/listassalvas';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AutenticacaoPage } from '../autenticacao/autenticacao';

export class Itens {
	nome: string;
	produtos: Array<string> = new Array();
}

@Component({
  selector: 'page-listadecompras',
  templateUrl: 'listadecompras.html',
})
export class ListadecomprasPage {
    lista: FirebaseListObservable<any>;
    itens: Itens;
	
	/*itens de supermercado*/
	arroz: boolean;
	feijao: boolean;
	oleo: boolean;
	acucar: boolean;
	cafe: boolean;
	leiteempo: boolean;
	sal: boolean;
	macarrao: boolean;
	extratoTomate: boolean;
	tempero: boolean;
	achocolatado: boolean;
	molhoTomate: boolean;
	farinhaTrigo: boolean;
	gelatina: boolean;
	biscoito: boolean;
	milho: boolean;
	
	  
	constructor(
        public alertCtrl: AlertController, public db: AngularFireDatabase,
        navParams: NavParams, public navCtrl: NavController, public modalCtrl: ModalController,
        public angFireAuth: AngularFireAuth
    ) {

        try {
            if(this.angFireAuth.auth.currentUser != null)
                this.lista = db.list('/itens_usuarios/' + this.angFireAuth.auth.currentUser.uid);
            else{
                //this.lista = db.list('/itens_anonimos');
                this.alerta();
            }
        } catch (error) {
            console.log(error);
        }

           
        this.itens = new Itens; 
    }


    //Função que avisa caso o usuário ainda não tenha logado
    alerta(){
        let alerta = this.alertCtrl.create({
            title: 'Voce não está logado. Por favor, faça login.',
            message: 'Faça login para poder salvar suas lista de compras!',
            buttons: [
                {
                    text: 'Fazer login',
                    handler: () => {
                        this.navCtrl.push(AutenticacaoPage);
                    }
                },
                {
                    text: 'Ok'
                }
            ]
        });
        alerta.present();

    }
	

	cadastrar1(nome: string) {
		

		if(this.arroz)
			this.itens.produtos.push("arroz");		
		if(this.feijao)
			this.itens.produtos.push("feijão");		
		if(this.oleo)
			this.itens.produtos.push("óleo");
		if(this.acucar)
			this.itens.produtos.push("açúcar");
		if(this.sal)
			this.itens.produtos.push("sal");
		if(this.cafe)
			this.itens.produtos.push("café");
		if(this.leiteempo)
			this.itens.produtos.push("leite em pó");
		if(this.macarrao)
			this.itens.produtos.push("macarrão");
		if(this.extratoTomate)
			this.itens.produtos.push("extrato de tomate");
		if(this.tempero)
			this.itens.produtos.push("tempero completo");
		if(this.achocolatado)
			this.itens.produtos.push("Achocolatado em pó");
		if(this.molhoTomate)
			this.itens.produtos.push("molho de tomate");
		if(this.farinhaTrigo)
			this.itens.produtos.push("farinha de trigo");
		if(this.gelatina)
			this.itens.produtos.push("gelatina");
		if(this.biscoito)
			this.itens.produtos.push("biscoito");
		if(this.milho)
			this.itens.produtos.push("milho verde");
		
		
		this.itens.nome = nome;
        
        
		this.lista.push(this.itens).then(() =>{
			this.itens = new Itens();
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
	}

	cadastrar() {

		var nome: string;

		let prompt = this.alertCtrl.create({
			title: 'Nova lista de compras',
			message: "Digite o nome da sua lista de compras",
			inputs: [{
				name: 'title',
				placeholder: 'Nome'
			}],
			buttons: [{
				text: 'Cancelar',
				handler: data => {
					nome = null;
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Salvar',
				handler: data => {
					console.log('Save clicked');
					nome = data.title;
					this.cadastrar1(nome);
				}
			}
			]
		});
		prompt.present();

	}

    
    //Função que chama pagina das listas salvas
	obterValor(value){
		console.log("era pra abrir as listas salvas!!!!!");
		this.navCtrl.push(ListassalvasPage);
    }


}
