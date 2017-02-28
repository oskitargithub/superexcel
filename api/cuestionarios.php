<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require_once '../../slim/vendor/autoload.php';
	
	$app = new \Slim\App();

	$db = new mysqli("localhost", "root", "", "superexcel");

     $app->post("/getlistado", function($request, $response, $args) use($db, $app) {
        header("Access-Control-Allow-Origin: *");
        $json = $request->getParam('json'); 		
		$data = json_decode($json, true);
        $token = $data["fditoken"];
        if($token == "4567489"){
            $query = $db->query("SELECT * FROM usuarios");
				//. "{$data["id_usuario"]}");	
                $datos = array();
		while ($fila = $query->fetch_assoc()) {
			$datos[] = $fila;
		}
	
           
            $result = array("status" => "success",
                    "data" => $datos);
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