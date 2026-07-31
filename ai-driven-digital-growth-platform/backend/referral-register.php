<?php
// ============================================================
//  referral-register.php
//  Saves new partner registration to MySQL
//  POST /backend/referral-register.php
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

// Validate required fields
$required = ['name', 'phone', 'city'];
foreach ($required as $field) {
    if (empty(trim($body[$field] ?? ''))) {
        json_response(false, null, "Field '$field' is required.", 422);
    }
}

$name      = trim(strip_tags($body['name']));
$phone     = trim(strip_tags($body['phone']));
$city      = trim(strip_tags($body['city']));
$howHeard  = trim(strip_tags($body['howHeard'] ?? 'Not specified'));

// Validate phone (basic Indian number check)
$cleanPhone = preg_replace('/\D/', '', $phone);
if (strlen($cleanPhone) < 10) {
    json_response(false, null, 'Please enter a valid phone number.', 422);
}

// ---------- Generate unique partner ID ----------
$partnerId = 'JT' . strtoupper(substr(md5($phone . time()), 0, 6));

// ---------- Save to DB ----------
try {
    $db = get_db();

    // Check if phone already registered
    $check = $db->prepare('SELECT id FROM referral_partners WHERE phone = :phone LIMIT 1');
    $check->execute([':phone' => $cleanPhone]);

    if ($check->fetch()) {
        // Already registered — return existing partner info
        $existing = $db->prepare('SELECT partner_id, name, city, status FROM referral_partners WHERE phone = :phone');
        $existing->execute([':phone' => $cleanPhone]);
        $partner = $existing->fetch();

        json_response(true, [
            'partner_id'     => $partner['partner_id'],
            'name'           => $partner['name'],
            'city'           => $partner['city'],
            'status'         => $partner['status'],
            'already_exists' => true,
        ], 'You are already registered as a partner!');
    }

    // Insert new partner
    $sql = 'INSERT INTO referral_partners
              (partner_id, name, phone, city, how_heard, status, registered_at)
            VALUES
              (:pid, :name, :phone, :city, :how_heard, "active", NOW())';

    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':pid'       => $partnerId,
        ':name'      => $name,
        ':phone'     => $cleanPhone,
        ':city'      => $city,
        ':how_heard' => $howHeard,
    ]);

    json_response(true, [
        'partner_id' => $partnerId,
        'name'       => $name,
        'city'       => $city,
        'status'     => 'active',
    ], 'Registration successful! Welcome to JhaTech Partner Program.');

} catch (\Throwable $e) {
    error_log('JhaTech referral register error: ' . $e->getMessage());
    json_response(false, null, 'Registration failed. Please try again or contact us on WhatsApp.', 500);
}
