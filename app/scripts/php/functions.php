<?php
function makeJsonArray($keimeno)
{
    $apotelesma          = explode("\r\n", $keimeno);
    $toPrint             = "[";
    $localCounter        = 0;
    $counterApotelesmata = count($apotelesma);
    foreach ($apotelesma as $ap) {
        $localCounter++;
        $search = array(PHP_EOL, '\r','\n','\r\n');
        str_replace($search, null, $ap);

        if ($counterApotelesmata == $localCounter) {
            $toPrint .=  '{"str":"'. $ap . '"}]';
        } else {
            $toPrint .=  '{"str":"'. $ap . '"},';
        }
    }
    return $toPrint;
}
