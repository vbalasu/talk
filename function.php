<?php
/*Similar to do.php, but can accept STDIN input. Uses proc_open and pipes instead of popen */ 
$output = array();
$cmd = filter_input(INPUT_POST, 'cmd');
$STDIN = filter_input(INPUT_POST, 'STDIN');
$uniqid = uniqid();
$errorfile = "errors$uniqid.txt";
if(!isset($cmd)) $cmd = "sqlite3 -help";
/*
$child = popen("$cmd 2>$errorfile", 'r');
$STDOUT = stream_get_contents($child);
$exitcode = pclose($child);
*/
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("file", $errorfile, "a") // stderr is a file to write to
);
$process = proc_open($cmd, $descriptorspec, $pipes);

if (is_resource($process)) {
    // $pipes now looks like this:
    // 0 => writeable handle connected to child stdin
    // 1 => readable handle connected to child stdout
    // Any error output will be appended to errorfile

    fwrite($pipes[0], $STDIN);
    fclose($pipes[0]);

    $STDOUT = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    // It is important that you close any pipes before calling
    // proc_close in order to avoid a deadlock
    $exitcode = proc_close($process);
}

$output['CMD'] = $cmd;
$output['STDIN'] = $STDIN;
$output['STDOUT'] = $STDOUT;
$output['STDERR'] = file_get_contents($errorfile);
$output['EXITCODE'] = $exitcode;
echo json_encode($output);
