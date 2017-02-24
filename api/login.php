<?php


	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require_once '../../../../wamp/www/slim/vendor/autoload.php';
	
	$app = new \Slim\App();

	$db = new mysqli("localhost", "root", "", "bdpruebasangular");

    $app->post("/login", function($request, $response, $args) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
        $json = $request->getParam("json");//$request->post("json");
		$data = json_decode($json, true);
        $query = "SELECT * FROM usuarios where email='{$data["usuario"]}' AND clave = '{$data["password"]}'";
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

   




	$app->get("/grupos", function() use($db, $app) {
		// sleep(3);
		$query = $db->query("SELECT * FROM grupos ORDER BY id DESC;");
		$grupos = array();
		while ($fila = $query->fetch_assoc()) {
			$grupos[] = $fila;
		}

		$result = array("status" => "success",
			"data" => $grupos);

		echo json_encode($result);
	});


	$app->get("/grupos/{id}", function (Request $request, Response $response) use($db, $app) {
		// sleep(3);
		$id = $request->getAttribute('id');
		$query = $db->query("SELECT * FROM grupos WHERE id = $id;");
		$grupo = $query->fetch_assoc();

		if ($query->num_rows == 1) {
			$result = array("status" => "success",
				"data" => $grupo);
		} else {
			$result = array(
				"status" => "error",
				"message" => "El grupo no existe");
		}

		echo json_encode($result);
	});

	$app->post("/grupos", function() use($db, $app) {
		$json = $app->request->post("json");
		$data = json_decode($json, true);

		$query = "INSERT INTO grupos VALUES(NULL,"
				. "'{$data["nombre"]}',"
				. "'{$data["descripcion"]}',"
				. "'{$data["id_familia"]}' "
				. ")";		
		$insert = $db->query($query);
		if ($insert) {
			$result = array("status" => "success",
				"message" => "Grupo creado correctamente!!!");
		} else {
			$result = array("status" => "error", "message" => "Grupo NO SE HA creado!!!");
		}

		echo json_encode($result);
	});

	$app->post("/update-grupo/:id", function($id) use($db, $app) {
		header("Access-Control-Allow-Origin: *");
		$json = $app->request->post("json");
		$data = json_decode($json, true);

		$query = "UPDATE grupos SET "
				. "nombre = '{$data["nombre"]}', "
				. "descripcion = '{$data["descripcion"]}', "
				. "id_familia = '{$data["id_familia"]}' "				
				. " WHERE id={$id}";
		$update = $db->query($query);

		if ($update) {
			$result = array("status" => "success", "message" => "El grupo se ha actualizado correctamente!!!");
		} else {
			$result = array("status" => "error", "message" => "El grupo NO SE HA actualizado!!!");
		}

		echo json_encode($result);
	});

	$app->get("/delete-grupo/:id", function($id) use($db, $app) {
		$query = "DELETE FROM grupos WHERE id = {$id}";
		$delete = $db->query($query);

		if ($delete) {
			$result = array("status" => "success", "message" => "El grupo se ha borrado correctamente!!!");
		} else {
			$result = array("status" => "error", "message" => "El grupo NO SE HA borrado!!!");
		}

		echo json_encode($result);
	});

	$app->run(); 
?>