<?php
$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2, "preg_1"=> "", "preg_2"=> "", "preg_3"=> "", "preg_4"=> "", "preg_5"=> "", "preg_6"=> "", "preg_7"=> "", "preg_8"=> "", "preg_9"=> "", "preg_10"=> "", "preg_11"=> "",
             "preg_12"=> "", "preg_13"=> "", "preg_14"=> "", "preg_15"=> "", "preg_16"=> "", "preg_17"=> "", "preg_18"=> "" , "preg_19"=> "", "preg_20"=> "" , "preg_21"=> "",
             "preg_22"=> "", "preg_23"=> "", "preg_24"=> "", "preg_25"=> "", "preg_26"=> "", "preg_27"=> "", "preg_28"=> "" , "preg_29"=> "", "preg_30"=> "" , "preg_31"=> "",
             "preg_32"=> "", "preg_33"=> "", "preg_34"=> "", "preg_35"=> "", "preg_36"=> "", "preg_37"=> "", "preg_38"=> "" , "preg_39"=> "" )   ,
            "preg_1_tabla_3"=> [
                array( "texto"=> "Por Acoso sexual", "mujeres"=> "2", "hombres"=> "3", "respuesta"=>0 ),
                array( "texto"=> "Por Acoso por razón de sexo", "mujeres"=> "4", "hombres"=> "5", "respuesta"=>0 ),
            ]         
);
echo json_encode($result);


?>