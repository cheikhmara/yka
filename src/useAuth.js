    import React, {createContext, useState, useEffect} from 'react';
import { createDirectus, authentication, rest, login, refresh } from '@directus/sdk';
import config from './Config';

// Creer le context AuthContext pour stocker la valeur du token qui sera généré
export const AuthContext = createContext('');

const DIRECTUS_URL = config.apiURL;  
//const username = config.usernameApp; //config.usernameApp2FA;
//const password = config.passwordApp; //config.passwordApp2FA;

export const TokenAuthContext = ({children}) => { 
    
    const [accessToken, setAccessToken] = useState({access_token: '', refresh_token:'', username:''});
    const [utilisateur, setUtilisateur] = useState(); // initilisé pour test
    const [motdepasse, setMotdepasse] = useState(); // initilisé pour test
    //const [user, setUser] = useState({username: username, password: password});
    const [isSubmit, setIsSubmit] = useState(false);

    const client = createDirectus(DIRECTUS_URL).with(authentication()).with(rest());

    useEffect(() => {
        if(isSubmit && utilisateur!=='' && motdepasse!==''){
            console.log("isSubmit", isSubmit);
            setUtilisateur(utilisateur);
            setMotdepasse(motdepasse);
            login2(utilisateur, motdepasse);    
        }        
        //return () => { }; // Nettoyage
    }, []); // fin useEffect

    const login2 = (utilisateur, motdepasse) => {
        if(utilisateur!=='' && motdepasse!==''){
            //console.log("User authentifié: ", accessToken);
            // Authentification composable using login and password
            client.request(login(utilisateur, motdepasse, {mode:'json'})).then(
                (reponse) => {  
                    console.log("reponse: ", reponse);
                    setAccessToken({
                        access_token: reponse.access_token,
                        refresh_token: reponse.refresh_token,
                        username: utilisateur
                    });
                    //console.log("accessToken: ", accessToken);
                    //console.log("Utilisateur " + utilisateur + " authentifié avec succès!");
                }
            ).catch(
                (erreur) => {
                    console.log("Erreur: ", erreur);
                    console.log("Utilisateur non authentifié!");
                }
            );
        }
    }

    const logout = () => {
        setAccessToken({
            access_token: '',
            refresh_token: '',
            username: ''
        });
        console.log("User déconnecté: ", accessToken);
        window.location.href = "/";
    } // Fin - logout()

    const handleSubmit = (e) => {
        e.preventDefault();
        login2(utilisateur, motdepasse);
        setIsSubmit(true);
        //console.log(e);
        //console.log("Username: ", utilisateur);
        //console.log("Password: ", motdepasse);
        //setAccessToken(accessToken);
        //setUtilisateur(utilisateur);
        //setMotdepasse(motdepasse);
        console.log("User authentifié: ", accessToken);
    }
    const handleUtilisateur = (e) => {
        setUtilisateur(e.target.value);
        //console.log(e.target.value);
    }
    const handleMotdepasse = (e) => {
        setMotdepasse(e.target.value);
        //console.log(e.target.value);
    }

    if(isSubmit && accessToken.access_token!==''){
        return(
            <>
                <AuthContext.Provider value={{accessToken, login2, logout}}>
                    {children}
                </AuthContext.Provider>
                <a className="btn btn-cancel btn-lg" onClick={logout}>Deconnexion</a>
            </>
        )
    }else {
        return(
            <form onSubmit={handleSubmit} style={{ width: '300px', margin: '0 auto'}}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                    <input 
                        type="text" 
                        value={utilisateur}
                        onChange={handleUtilisateur}
                        className="form-control" 
                        name="username"
                        placeholder="Username" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1" 
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input 
                        type="password" 
                        value={motdepasse}
                        onChange={handleMotdepasse}
                        className="form-control" 
                        name="password"
                        placeholder="Paswword" 
                        aria-label="Password" 
                        aria-describedby="basic-addon1" 
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Connexion</button>
            </form>
        )
    }    

}