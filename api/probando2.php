<?php

$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2,"preg_1"=>"","preg_2"=>"","preg_3"=>"","preg_4"=>"si","preg_5"=>"","preg_6"=>"capulin","preg_7"=>"","preg_8"=>"","preg_9"=>"4","preg_10"=>"15" ,"preg_11"=>"10","preg_12"=>""  ),
            "preg_0_tabla_2"=> [
                array( "texto"=> "1", "valor"=> "true"),
                array( "texto"=> "2", "valor"=> "false"),
                array( "texto"=> "3", "valor"=> "true"),
                array( "texto"=> "4", "valor"=> "true"),
            ],
            "preg_1_tabla_3"=> [
                array( "texto"=> "Personas empleadas con hijos e hijas a cargo", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "Personas  empleadas  con  otros  familiares  o personas dependientes a cargo", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_2_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_3_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_4_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_5_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_6_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_7_tabla_3"=> [
                array( "texto"=> "1", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "2", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "3", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "4", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "5", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "6", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "7", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "8", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "9", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "10", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "11", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "12", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "13", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "14", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "15", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "16", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "17", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_8_tabla_3"=> [
                array( "texto"=> "1", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "2", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "3", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "4", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "5", "mujeres"=> "2", "hombres"=> "3" ),
                array( "texto"=> "6", "mujeres"=> "2", "hombres"=> "3" ),
            ],
            "preg_9_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" )
            ],
            "preg_10_tabla_3"=> [
                array( "texto"=> "", "mujeres"=> "2", "hombres"=> "3" )
            ],
            "preg_rara"=>[
                array("texto"=> "pregunta 1", "valor"=> "true"),
                array("texto"=> "pregunta 2", "valor"=> "false"),
                array("texto"=> "pregunta 3", "valor"=> "true", "otro"=> "Perico de los palotes")
            ]
			);

echo json_encode($result);


?>