<?php
$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2, "preg_1"=> "", "preg_2"=> "", "preg_3"=> "", "preg_4"=> "", "preg_5"=> "", "preg_6"=> "", "preg_7"=> "", "preg_8"=> "", "preg_9"=> "", "preg_10"=> "", "preg_11"=> "",
             "preg_12"=> "", "preg_13"=> "", "preg_14"=> "", "preg_15"=> "", "preg_16"=> "", "preg_17"=> "", "preg_18"=> "" , "preg_19"=> "", "preg_20"=> "" , "preg_21"=> "",
             "preg_22"=> "", "preg_23"=> "", "preg_24"=> "", "preg_25"=> "", "preg_26"=> "", "preg_27"=> "", "preg_28"=> "" , "preg_29"=> ""),
            "preg_174_tabla_3"=> [
                array( "texto"=> "¿Se ofrece la posibilidad de recibir formación que no esté directamente relacionada con el puesto de trabajo?", "mujeres"=> "", "hombres"=> "" ) ,
                array( "texto"=> "¿Existen formación para el personal en materia de igualdad de oportunidades?", "mujeres"=> "", "hombres"=> "" )                    
            ],
            "preg_195_tabla_3"=> [
                array( "texto"=> "Cuantas personas se benefician de esa formación", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_199_tabla_3"=> [
                array( "texto"=> " Personas beneficiadas de formación interna", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> " Personas beneficiadas de formación externa", "mujeres"=> "", "hombres"=> "" ),
            ],
            "preg_200_tabla_3"=> [
                array( "texto"=> "A1", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "A2", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "B", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "C1", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "C2", "mujeres"=> "", "hombres"=> "" ),
                array( "texto"=> "E", "mujeres"=> "", "hombres"=> "" ),
            ],
);
echo json_encode($result);


?>