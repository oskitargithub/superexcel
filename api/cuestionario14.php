<?php
$result = array("status"=> "success", "total"=> 24, "respondidas"=> 0,
            "respondidasCuest"=> 0, "respondidasSeccion"=> 9, "totalCuest"=> 12, "totalSeccion"=> 12,
            "data"=> array( "user_id"=> 2, "preg_1"=> "", "preg_2"=> "", "preg_3"=> "", "preg_4"=> "", "preg_5"=> "", "preg_6"=> "", "preg_7"=> "", "preg_8"=> "", "preg_9"=> "" ),            
             "preg_200"=> [
                array("respuesta"=> "","texto"=> "Reuniones1","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones2","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones3","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones4","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones5","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones6","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones7","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones8","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones9","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Reuniones10","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Correo Postal","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Intranet","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Sistemas mensajeria tipo Whatsapp, Msn","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Buzón de sugerencias","valor1"=> ""),
                array("respuesta"=> "","texto"=> "Otros","valor1"=> "","texto1"=> ""),
             ],
            "preg_201"=> [
                array( "texto"=> "Web", "valor1"=> "","texto1"=>"", "respuesta"=> "" ),
                array( "texto"=> "Revistas Profesionales", "valor1"=> "","texto1"=>"", "respuesta"=> "" ),
            ],
);
echo json_encode($result);


?>