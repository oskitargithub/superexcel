<?php
$result = array("status"=> "success",
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2, "preg_1"=> "", "preg_2"=> "", "preg_3"=> "", "preg_4"=> "", "preg_5"=> "", "preg_6"=> "", "preg_7"=> "", "preg_8"=> "", "preg_9"=> "", "preg_10"=> "", "preg_11"=> "",
             "preg_12"=> "", "preg_13"=> "", "preg_14"=> "", "preg_15"=> "", "preg_16"=> "", "preg_17"=> "", "preg_18"=> "" , "preg_19"=> "", "preg_20"=> "" , "preg_21"=> "",
             "preg_22"=> "", "preg_23"=> "", "preg_24"=> "", "preg_25"=> "", "preg_26"=> ""),
            "preg_1_tabla_5"=> [
                array( "texto1"=> "ao", "texto2"=> "true", "texto3"=> "false", "texto4"=> "", "texto5"=> "" ),
                
            ],
            "preg_2_tabla_5"=> [
                array( "texto1"=> "ea", "texto2"=> "1", "texto3"=> "false", "texto4"=> "", "texto5"=> "" ),
            ],
            "preg_3_tabla_3"=> [
                array( "texto"=> "Solicitudes de promoción presentadas", "mujeres"=> "1", "hombres"=> "1" ),
            ],
            "preg_4_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_5_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_6_tabla_3"=> [
                array( "texto"=> "Transformación de contratos a tiempo parcial en tiempo completo", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_7_tabla_3"=> [
                array( "texto"=> "Salarial sin cambio de categoría", "mujeres"=> "12", "hombres"=> "5" ),
                array( "texto"=> "Vinculada a movilidad geográfica", "mujeres"=> "5", "hombres"=> "2" ),
                array( "texto"=> "Cambio de categoría por prueba objetiva", "mujeres"=> "3", "hombres"=> "1" ),
                array( "texto"=> "Cambio de categoría por antigüedad", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "Cambio de categoría decidido por la organización", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_8_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "", "hombres"=> "" ),                
            ]);

echo json_encode($result);


?>