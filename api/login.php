<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require_once '../../slim/vendor/autoload.php';
	
	$app = new \Slim\App();

	$db = new mysqli("localhost", "root", "", "superexcel");

    $app->post("/login", function($request, $response, $args) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
        $json = $request->getParam("json");//$request->post("json");
		$data = json_decode($json, true);
        $query = "SELECT *, '4567489' as token FROM usuarios where usuario='{$data["usuario"]}' AND clave = '{$data["password"]}'";
        $usuario = $db->query($query);
		if ($usuario->num_rows == 1) {
            $asoc = $usuario->fetch_assoc();
			$result = array(
                "status" => "success",
				"data" => $asoc
                );
		} else {
			$result = array(
				"status" => "error",
				"message" => "El usuario o la contraseña son incorrectas" ,
                "data" => "");
		}
		echo json_encode($result);
	});
	
	$app->post("/isLogged", function($request, $response, $args) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
        $json = $request->getParam("json");//$request->post("json");
		$data = json_decode($json, true);
		$perfil = $data["roles"];
		$token = $data["fditoken"];
		$usuario = $data["usuario"];
        
		$query = "SELECT *, '4567489' as token FROM usuarios where usuario='{$usuario}'";
		$usuario = $db->query($query);
		if ($usuario->num_rows == 1) {
            $asoc = $usuario->fetch_assoc();
			if($asoc["perfil"] == $perfil){
				$result = array(
                "status" => "success",
				"data" => ""
				);
			}
			else{
				$result = array(
				"status" => "error",
				"message" => "El usuario no tiene permiso para acceder a esta opción. Perfil requerido". $perfil. " perfil usu:".$asoc["perfil"],
                "data" => "");
			}
		}
		else{
			$result = array(
				"status" => "error",
				"message" => "El usuario no está logado" ,
                "data" => "");
		}
		echo json_encode($result);
	});


$app->post("/dimePerfil", function($request, $response, $args) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
        $json = $request->getParam("json");//$request->post("json");
		$data = json_decode($json, true);		
		$token = $data["fditoken"];
		
        if(!isset($data["usuario"])){
            $result = array(
				"perfil" => "");
                echo json_encode($result);
                die();
        }
        $usuario = $data["usuario"];
		$query = "SELECT *, '4567489' as token FROM usuarios where usuario='{$usuario}'";
		$usuario = $db->query($query);
		if ($usuario->num_rows == 1) {
            $asoc = $usuario->fetch_assoc();
            $result = array(
				"perfil" => $asoc["perfil"]);
		}
		else{
			$result = array(
				"perfil" => "");
		}
		echo json_encode($result);
	});

	$app->post("/isLogged2", function($request, $response, $args) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
        $json = $request->getParam("json");//$request->post("json");
		$data = json_decode($json, true);
		$perfil = $data["permisos"];
		$token = $data["fditoken"];
		
        if(!isset($data["usuario"])){
            $result = array(
				"status" => "error",
				"message" => "El usuario no está logado" ,
                "data" => "");
                echo json_encode($result);
                die();
        }
        $usuario = $data["usuario"];
		$query = "SELECT *, '4567489' as token FROM usuarios where usuario='{$usuario}'";
		$usuario = $db->query($query);
		if ($usuario->num_rows == 1) {
            $asoc = $usuario->fetch_assoc();
			if($asoc["perfil"] == $perfil){
				$result = array("success" => true);
			}
			else{
				$result = array("success" => false);
			}
		}
		else{
			$result = array("success" => false);
		}
		echo json_encode($result);
	});





	$app->run(); 
?>