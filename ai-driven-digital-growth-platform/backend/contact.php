<?php
// ============================================================
//  contact.php
//  Saves general inquiries / WhatsApp leads to DB
//  POST /backend/contact.php
// ============================================================

require_once __DIR__ . '/config.php';

set_cors_headers($allowed_origins);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Only POST requests are allowed.', 405);
}

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!$body) {
    json_response(false, null, 'Invalid JSON body.', 400);
}

$name    = trim(strip_tags($body['name']    ?? ''));
$phone   = trim(strip_tags($body['phone']   ?? ''));
$message = trim(strip_tags($body['message'] ?? ''));
$source  = trim(strip_tags($body['source']  ?? 'website')); // e.g. hero, pricing, footer

if (!$name || !$phone) {
    json_response(false, null, 'Name and phone are required.', 422);
}

try {
    $db  = get_db();
    $sql = 'INSERT INTO contact_inquiries
              (name, phone, message, source, created_at)
            VALUES
              (:name, :phone, :message, :source, NOW())';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':name'    => $name,
        ':phone'   => $phone,
        ':message' => $message,
        ':source'  => $source,
    ]);

    json_response(true, null, 'Inquiry saved. We will contact you within 1 hour on WhatsApp!');

} catch (\Throwable $e) {
    error_log('JhaTech contact error: ' . $e->getMessage());
    json_response(false, null, 'Failed to save inquiry. Please WhatsApp us directly.', 500);
}
