<?php session_start();

$_SESSION = [];
$curl_res = [];

if ( !( mb_strtolower($_SERVER['REQUEST_METHOD']) == 'get' || mb_strtolower($_SERVER['REQUEST_METHOD']) == 'post' ) ) {
	http_response_code(405);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Method Not Allowed.';

	echo json_encode($curl_res);
	exit();
}
if ( !isset($_REQUEST) || !is_array($_REQUEST) ) {
	http_response_code(400);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Bad Request.';

	echo json_encode($curl_res);
	exit();
}
if ( !isset($_REQUEST['timestamp']) || !( $_REQUEST['timestamp'] > 0) ) {
	http_response_code(400);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Bad Request.';

	echo json_encode($curl_res);
	exit();
}
if ( abs(time()-$_REQUEST['timestamp'])>600 ) {
	http_response_code(408);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Request Timeout.';

	echo json_encode($curl_res);
	exit();
}
if ( !isset($_REQUEST['sharecode']) || strlen($_REQUEST['sharecode']) < 1 ) {
	http_response_code(400);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Bad Request.';

	echo json_encode($curl_res);
	exit();
}
if ( !isset($_REQUEST['authncode']) || strlen($_REQUEST['authncode']) < 1 ) {
	http_response_code(400);
	$curl_res['timestamp'] = time();
	$curl_res['mesg']      = 'Bad Request.';

	echo json_encode($curl_res);
	exit();
}

function issue_num_rand($len=0) {
	$result = '';
	for( $i=0; $i<$len; $i++ ) {
		$result .= rand(0, 9);
	}
	return $result;
}

if ( mb_strtolower($_SERVER['REQUEST_METHOD']) == 'post' ) {
	header('content-type: Application/json');

	$curl_res['timestamp'] = microtime(true);
	$curl_res['connected'] = false;
	$curl_res['sharecode'] = $_REQUEST['sharecode'];
	
	$pdo = new \PDO(
		'pgsql:dbname=webapp host=database_mojiokoshi_v2 port=5432',
		'postgres',
		'passw0rd',
		[
			\PDO::ATTR_PERSISTENT => true,
			\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
			\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
		]
	);

	/**
	 * 古いデータの削除(完全削除)
	 */
	$stm = $pdo->prepare('DELETE FROM transcription WHERE iat < ?;');
	$res = $stm->execute([
		strtotime('-1 day'),
	]);

	/**
	 * 存在するKEYのみ受け入れる
	 */
	$stm = $pdo->prepare('SELECT * FROM transcription WHERE sharecode = ? AND authncode = ? ORDER BY iat ASC;');
	$res = $stm->execute([
		$_REQUEST['sharecode'],
		$_REQUEST['authncode'],
	]);
	$res = $stm->rowCount();
	if ( $res < 1 ) {
		http_response_code(400);
		$curl_res['timestamp'] = time();
		$curl_res['mesg']      = 'Bad Request.';
	
		echo json_encode($curl_res);
		exit();
	}
	$curl_res['connected'] = $res>0;

	echo json_encode($curl_res);
	exit();
}
