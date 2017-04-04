<?php
$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,            
            "preg_1_tabla_3"=> [
                array( "texto"=> "uno", "mujeres"=> "2", "hombres"=> "3", "respuesta"=>0 ),
                array( "texto"=> "dos", "mujeres"=> "4", "hombres"=> "5", "respuesta"=>0 ),
            ]  ,
            "preg_2_tabla_3"=> [
                array( "texto"=> "otro", "mujeres"=> "2", "hombres"=> "3", "respuesta"=>0 )
               
            ]         
);
echo json_encode($result);


?>