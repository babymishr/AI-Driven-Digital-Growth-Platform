<?php
// ============================================================
//  JhaTech Backend Config
//  Copy this file, fill in your values, rename to config.php
// ============================================================

// ---------- OpenAI ----------
define('OPENAI_API_KEY', 'YOUR_OPENAI_API_KEY_HERE');
define('OPENAI_MODEL',   'gpt-3.5-turbo');          // or gpt-4o

// ---------- MySQL ----------
define('DB_HOST', 'localhost');
define('DB_NAME', 'jhatech_db');
define('DB_USER', 'root');
define('DB_PASS', '');                               // XAMPP default is empty
define('DB_PORT', 3306);

// ---------- App ----------
define('APP_ENV',      'development');               // 'production' on live server
define('ADMIN_EMAIL',  'admin@jhatech.in');

// ---------- Allowed Origins (CORS) ----------
// Local React dev server + production domain
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://jhatech.in',
    'https://www.jhatech.in',
];

// ---------- Helper: Set CORS headers ----------
function set_cors_headers(array $allowed_origins): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed_origins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ---------- Helper: JSON response ----------
function json_response(bool $success, mixed $data = null, string $message = '', int $code = 200): never {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- Helper: MySQL PDO connection ----------
function get_db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
            DB_HOST, DB_PORT, DB_NAME
        );
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}
