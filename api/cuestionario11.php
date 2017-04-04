<?php
$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2, "preg_1"=> "", "preg_2"=> "", "preg_3"=> "", "preg_4"=> "", "preg_5"=> "", "preg_6"=> "", "preg_7"=> "", "preg_8"=> "", "preg_9"=> "", "preg_10"=> "", "preg_11"=> "",
             "preg_12"=> "", "preg_13"=> "", "preg_14"=> "", "preg_15"=> "", "preg_16"=> "", "preg_17"=> "", "preg_18"=> "" , "preg_19"=> "", "preg_20"=> "" , "preg_21"=> "",
             "preg_22"=> "", "preg_23"=> "" )            
);
echo json_encode($result);


?>