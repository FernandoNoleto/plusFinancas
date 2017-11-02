import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';



@Injectable()
export class AuthProvider {

    constructor(
        private angularFireAuth: AngularFireAuth,
        private facebook: Facebook
    ) { }

    createUser(user: User) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    signIn(user: User) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    
    signInWithFacebook() {
        return this.facebook.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
            //https://developers.facebook.com/docs/graph-api/reference/user
            //Ao logar com o facebook o profile do usuario é automaticamente atualizado.
            return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
        });
    }

    


    
    signOut() : Promise<any> {
        if (this.angularFireAuth.auth.currentUser.providerData.length) {
            for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
                var provider = this.angularFireAuth.auth.currentUser.providerData[i];

                if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { // Se for facebook
                    return this.facebook.logout().then(() => {
                        return this.signOutFirebase();
                    })
                }
            }
        }
        return this.signOutFirebase();
    }
    

    private signOutFirebase() {
        return this.angularFireAuth.auth.signOut();
    }

    resetPassword(email: string) {
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }

    deleteAccount(){
        try {
            return this.angularFireAuth.auth.currentUser.delete();
        }catch (err) {
             console.log(JSON.stringify(err));
        }
    }

}
