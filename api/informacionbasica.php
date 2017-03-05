<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require_once '../../slim/vendor/autoload.php';
	
	$app = new \Slim\App();

	$db = new mysqli("localhost", "root", "", "superexcel");

$app->get("/informacionbasica", function() use($db, $app) {
        header("Access-Control-Allow-Origin: *");
		
        $query = $db->query("SELECT * FROM informacionbasica WHERE id_usuario = 45");
		
		$datos = $query->fetch_assoc();

		if ($query->num_rows == 1) {
			$result = array("status" => "success",
				"data" => $datos);
		} else {
			$result = array(
				"status" => "error",
				"message" => "El grupo no existe");
		}

		echo json_encode($result);
	});

    //mostramos datos de la pestaña información básica
    $app->post("/getinformacionbasica", function($request, $response, $args) use($db, $app) {
        header("Access-Control-Allow-Origin: *");
        $json = $request->getParam('json'); 		
		$data = json_decode($json, true);
        $token = $data["fditoken"];
        if($token == "4567489"){
            $query = $db->query("SELECT * FROM informacionbasica WHERE id_usuario = 45");
            $query2 = $db->query("SELECT centro,actividad FROM infobasica_centros_actividades WHERE id_informacionbasica = 2");
			
            	//. "{$data["id_usuario"]}");		
            $datos = $query->fetch_assoc();
            if ($query->num_rows == 1) {
                $centros_actividades=array();
                while ($fila = $query2->fetch_assoc()) {
                    array_push($centros_actividades,array("centro"=>$fila["centro"], "actividad"=>$fila["actividad"])) ;
                }
                
                //$datos["centros_actividades"] = $centros_actividades;
                
                $result = array("status" => "success",
                    "data" => $datos, "centros_actividades"=> $centros_actividades);
            } else {
                $result = array(
                    "status" => "error",
                    "message" => "El formulario no existe");
            }
        }
        else{
             $result = array(
                    "status" => "tokenerror",
                    "message" => "Token no válido");
        }
		echo json_encode($result);
	});




    //actualizamos datos de pestaña información básica
    $app->post("/updinformacionbasica", function($request, $response, $args) use($db, $app) {
        header("Access-Control-Allow-Origin: *");
        $json = $request->getParam('json'); 		
		$data = json_decode($json, true);
        $token = $data["fditoken"];
        $registro = $data["informacionbasica"];
        if($token == "4567489"){
            $update = $db->query("Update informacionbasica set "
            . " razon_social = '{$registro["razon_social"]}' "
            ." WHERE id_usuario = ".$registro["id_usuario"]);
				//. "{$data["id_usuario"]}");	
            
            if ($update) {
                $result = array("status" => "success", "message" => "El registro se ha actualizado correctamente!!!");
            } else {
                $result = array("status" => "error", "message" => "El registro NO SE HA actualizado!!!");
            }
        }
        else{
             $result = array(
                    "status" => "tokenerror",
                    "message" => "Token no válido");
        }
		echo json_encode($result);
	});

    $app->run(); 
?>