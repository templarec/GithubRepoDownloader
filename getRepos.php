<?php
//api per il download dei dati (json da github) di tutte le repo di un determinato utente
    // mi serve per avere la lista delle repo da scaricare da passare poi al git clone in download.php
//lo script parte solo se c'è una richiesta get da parte di index.html con il nome dell'utente
if (isset($_GET['user'])) {
    $user = $_GET['user'];

}   //api token di github
    $token = 'afd130c21f2a456536ad1634445f0aab2413477a';
    //composizione header da mandare all'api di github
    $header = array(
        'User-Agent: request',
        'Authorization: '.$token.'',
    );
    //assemblo l'url dell'api con nome utente
    $url = 'https://api.github.com/search/repositories?q=user:'.$user."&per_page=100";

    //inizio sessione CURL
    $ch = curl_init();
    //OPZIONI CURL
    //DOVE:
    curl_setopt($ch, CURLOPT_URL, $url);
    //HEADER:
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    //NON HO IDEA
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    //ESEGUO
    $response = curl_exec($ch);

    curl_close($ch);
    //FINE SESSIOE CURL
    //output , per qualche motivo va bene così senza jsonarlo
    echo $response ;
?>