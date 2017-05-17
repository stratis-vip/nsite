<?php
function makeJsonArray($keimeno)
{
    $apotelesma          = explode(PHP_EOL, $keimeno);
    $toPrint             = "[";
    $localCounter        = 0;
    $counterApotelesmata = count($apotelesma);
    foreach ($apotelesma as $ap) {
        $localCounter++;
        if ($counterApotelesmata == $localCounter) {
            $toPrint .=  '{"str":"'. addslashes($ap) . '"}]';
        } else {
            $toPrint .=  '{"str":"'. addslashes($ap) . '"},';
        }
    }
    return $toPrint;
}
