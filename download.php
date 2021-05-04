<?php
//script api di download delle repo
//RICEZIONI VARIABILI dove salvare le repo
$user = $_GET['user'];
$repo = $_GET['repo'];
$repoUrl = $_GET['repourl'];
$gitPath = $_GET['gitpath']; //inizialmente era il path assoluto sul mio pc di git, poi ho visto che funzionava anche solo con "git" (prima non andava, boh)
$dir = 'output/'. $user . '/'. $repo; //dir di output in locale => output/nomeutente
$command = $gitPath." clone " . "$repoUrl".' '. $dir." 2>&1"; // commando da eseguire come shell , 2>&1 come fine riga altrimenti shell_exec() non stampa nulla, boh
$risposta = shell_exec($command); //esecuzione del comando shell
echo $risposta; //risposta per debug in console log sul main.js