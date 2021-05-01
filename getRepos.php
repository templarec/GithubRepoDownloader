<?php


if (isset($_GET['user'])) {
    $user = $_GET['user'];

}
    $token = 'afd130c21f2a456536ad1634445f0aab2413477a';
    $header = array(
        'User-Agent: request',
        'Authorization: '.$token.'',
    );
    $url = 'https://api.github.com/search/repositories?q=user:'.$user."&per_page=100";


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $response = curl_exec($ch);

    curl_close($ch);
    //$response = json_decode($response);


    //$numeroRepo =  $response->total_count;
    //echo $numeroRepo;
    echo $response ;

    /*foreach ($response->items as $keys => $values ) {
        $dir = 'output/'. $user . '/'. $values->name;
        $command = $gitPath." clone " . "$values->clone_url".' '. $dir;
        //shell_exec($command);

    }*/





?>