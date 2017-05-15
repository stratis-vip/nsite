<?php
function makeJsonArray($keimeno)
{
    $apotelesma          = explode(PHP_EOL, $keimeno);
    $toPrint             = "[";
    $localCounter        = 0;
    $counterApotelesmata = count($apotelesma);
    foreach ($apotelesma as $ap) {
        $toPrint .= "{\"str\":\"" . addslashes($ap) . "\"}";
        $localCounter++;
        if ($counterApotelesmata == $localCounter) {
            $toPrint .= "]";
        } else {
            $toPrint .= ",";
        }
    }
    return $toPrint;
}
