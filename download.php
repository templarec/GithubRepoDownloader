<?php
$user = $_GET['user'];
$repo = $_GET['repo'];
$repoUrl = $_GET['repourl'];
$gitPath = $_GET['gitpath'];
$dir = 'output/'. $user . '/'. $repo;
$command = $gitPath." clone " . "$repoUrl".' '. $dir." 2>&1";
$risposta = shell_exec($command);
echo $risposta;