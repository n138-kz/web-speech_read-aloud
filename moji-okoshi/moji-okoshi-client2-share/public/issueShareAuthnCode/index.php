<?php session_start();

$_SESSION = [];
$curl_res = [];

if (mb_strtolower($_SERVER['REQUEST_METHOD']) != 'get' ) {
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
if ( !isset($_REQUEST['timestamp']) || (! $_REQUEST['timestamp'] > 0) ) {
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

function issue_num_rand($len=0) {
	$result = '';
	for( $i=0; $i<$len; $i++ ) {
		$result .= rand(0, 9);
	}
	return $result;
}

header('content-type: Application/json');

