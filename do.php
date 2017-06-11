<?php
$output = array();
$cmd = filter_input(INPUT_POST, 'cmd');
$uniqid = uniqid();
$errorfile = "errors$uniqid.txt";
if(!isset($cmd)) $cmd = "sqlite3 -help";
$child = popen("$cmd 2>$errorfile", 'r');
$stdout = stream_get_contents($child);
$exitcode = pclose($child);
$output['CMD'] = $cmd;
$output['STDOUT'] = $stdout;
$output['STDERR'] = file_get_contents($errorfile);
$output['EXITCODE'] = $exitcode;
echo json_encode($output);