<?php
function countVisits() {
    $file = "visits.txt";

    // Create file if it doesn't exist
    if (!file_exists($file)) {
        file_put_contents($file, 0);
    }

    // Open file
    $fp = fopen($file, "r+");

    if (flock($fp, LOCK_EX)) {
        $count = intval(fread($fp, filesize($file)));

        $count++;

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $count);

        fflush($fp);
        flock($fp, LOCK_UN);
    } else {
        $count = "Error locking file";
    }

    fclose($fp);

    return $count;
}
?>
